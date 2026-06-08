import { useEffect, useState } from "react";
import API from "../services/api";

function OrderFulfillment() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const pickItem = async (product) => {
  try {
    if (product.quantity <= 0) {
      alert("Out of Stock");
      return;
    }

    await API.put(`/products/${product._id}`, {
      ...product,
      quantity: product.quantity - 1,
    });

    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <h1>Order Fulfillment</h1>

      <table border="1">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Shelf</th>
            <th>Pick</th>
            <th>Quantity</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.shelf}</td>
              <td>{product.quantity}</td>

              <td>
                <button
                  onClick={() => pickItem(product)}
                >
                  Pick Item
                </button>

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderFulfillment;