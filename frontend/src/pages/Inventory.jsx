import API from "../services/api";
import ProductForm from "../components/ProductForm";
import ProductQR from "../components/ProductQR";
import "./Inventory.css";
import Sidebar from "../components/Sidebar";
import React, { useEffect, useState } from "react";
import {
  trackProductAdded,
  trackProductUpdated,
  trackProductDeleted,
  trackQRGenerated,
  trackSearch,
} from "../analytics/events";
import { trackLogout } from "../analytics/events";
import { createActivity } from "../services/activityService";
function Inventory() {
  // const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async (productData) => {
  try {
    const res = await API.post("/products", productData);

    console.log("Product returned from backend:", res.data);

    if (res.data) {
      trackProductAdded(res.data);
      console.log("✅ Product Added analytics sent");
    }
    await createActivity({
    user: localStorage.getItem("name"),
    role: localStorage.getItem("role"),
    action: "Product Added",
    productName: res.data.name,
    productId: res.data.productId,
    details: `Shelf ${res.data.shelf}`,
  });

    await fetchProducts();
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

const deleteProduct = async (product) => {
  try {
    await API.delete(`/products/${product._id}`);

    // PostHog
    trackProductDeleted(product);

    // MongoDB Activity
    await createActivity({
      user: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      action: "Product Deleted",
      productName: product.name,
      productId: product.productId,
      details: `Deleted from Shelf ${product.shelf}`,
    });

    await fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

  const editProduct = (product) => {
    setEditingProduct(product);
  };

const saveUpdate = async () => {
  try {
    const res = await API.put(
      `/products/${editingProduct._id}`,
      editingProduct
    );

    trackProductUpdated(res.data);

    await createActivity({
      user: localStorage.getItem("name"),
      role: localStorage.getItem("role"),
      action: "Product Updated",
      productName: res.data.name,
      productId: res.data.productId,
      details: `Quantity: ${res.data.quantity}, Shelf: ${res.data.shelf}`,
    });

    setEditingProduct(null);

    await fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.productId
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) 
  );

  const getStatus = (quantity) => {
    if (quantity < 10) return "Low";
    if (quantity < 25) return "Medium";
    return "Good";
  };

  return (
    <div className="dashboard">

       <Sidebar />

      {/* MAIN CONTENT */}

      <div className="main">

        <div className="inventory-header">
          <div>
            <h1>Inventory</h1>
            <p>
              {products.length} products tracked
            </p>
          </div>
        </div>

        {/* ADD PRODUCT */}

        {localStorage.getItem("role") === "admin" && (
          <div className="form-section">
            <ProductForm
              onAddProduct={addProduct}
              products={products}
            />
          </div>
        )}

        {/* SEARCH */}

        <div className="top-controls">

          <input
            className="search-input"
            type="text"
            placeholder="Search name, ID..."
            value={searchTerm}
            onChange={(e) => {
          setSearchTerm(e.target.value);

          if (e.target.value.length > 2) {
          trackSearch(e.target.value);
          }
          }}
          />

        </div>

        {/* EDIT PRODUCT */}

        {editingProduct && (
          <div className="edit-box">

            <h3>Edit Product</h3>

            <input
              type="number"
              placeholder="Quantity"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: Number(e.target.value),
                })
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={editingProduct.price || 0}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: Number(e.target.value),
                })
              }
            />

            <button
              className="save-btn"
              onClick={saveUpdate}
            >
              Save Changes
            </button>

          </div>
        )}
      
        {/* TABLE */}

        <div className="table-wrapper">

          <table className="inventory-table">

          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>NAME</th>
              <th>QTY</th>
              <th>PRICE</th>
              <th>LOCATION</th>
              <th>STATUS</th>
              <th>CREATED</th>
              <th>UPDATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
<tbody>

  {filteredProducts.map((product) => (
      <tr key={product._id}>


        <td>{product.productId}</td>

        <td>
          <strong>{product.name}</strong>
        </td>

        <td>{product.quantity}</td>

        <td>₹{product.price || 0}</td>

        <td>{product.shelf}</td>

        <td>
          <span
            className={`status-${getStatus(
              product.quantity
            ).toLowerCase()}`}
          >
            ● {getStatus(product.quantity)}
          </span>
        </td>

        <td>
          {product.createdAt
            ? new Date(
                product.createdAt
              ).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </td>

        <td>
          {product.updatedAt
            ? new Date(
                product.updatedAt
              ).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </td>

        <td>

         {localStorage.getItem("role") === "admin" && (
            <button
              className="action-btn edit-btn"
              onClick={() =>
                editProduct(product)
              }
            >
              Edit
            </button>
          )}

            {localStorage.getItem("role") === "admin" && (
              <button
                className="action-btn delete-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Delete this product?"
                    )
                  ) {
                    deleteProduct(product);
                  }
                }}
              >
                Delete
              </button>
            )}

        onClick={async () => {
          trackQRGenerated(product);

          await createActivity({
            user: localStorage.getItem("name"),
            role: localStorage.getItem("role"),
            action: "QR Viewed",
            productName: product.name,
            productId: product.productId,
            details: `Viewed QR for Shelf ${product.shelf}`,
          });

          setSelectedProduct(
            selectedProduct?._id === product._id
              ? null
              : product
          );
}}

        </td>

      </tr>

  ))}

</tbody>

    </table>

    </div>
    {selectedProduct && (
  <div className="qr-popup">

    <button
      className="close-qr"
      onClick={() => setSelectedProduct(null)}
    >
      ✖
    </button>

    <ProductQR product={selectedProduct} />

  </div>
  )}


    </div>

    </div>
    );
    }

    export default Inventory;