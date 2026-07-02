import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";
import FloatingAssistant from "../components/FloatingAssistant";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [products, setProducts] = useState([]);
  const [showAllLowStock, setShowAllLowStock] = useState(false);
  const [showAllRecent, setShowAllRecent] = useState(false);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");

    if (!loggedUser) {
      navigate("/");
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalQuantity = products.reduce(
    (sum, product) => sum + Number(product.quantity),
    0
  );

  // Low stock products sorted from lowest quantity to highest
  const lowStockProducts = [...products]
    .filter((product) => Number(product.quantity) < 20)
    .sort((a, b) => Number(a.quantity) - Number(b.quantity));

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.quantity) * Number(product.price || 0),
    0
  );

  // Greeting
  const firstName = user?.name?.split(" ")[0] || "User";

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">

        {/* Header */}
        <div className="topbar">
          <h2 className="greeting">
            {greeting}, {firstName}
          </h2>

          <h1>Dashboard</h1>

          <p className="dashboard-subtitle">
            Monitor your warehouse inventory,
            stock levels and warehouse operations
            in real time.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="cards">
          <div className="card">
            <p>Total Products</p>
            <h2>{products.length}</h2>
          </div>

          <div className="card">
            <p>Total Stock Units</p>
            <h2>{totalQuantity}</h2>
          </div>

          <div className="card">
            <p>Inventory Value</p>
            <h2>₹{inventoryValue.toLocaleString()}</h2>
          </div>

          <div className="card">
            <p>Low Stock Items</p>
            <h2>{lowStockProducts.length}</h2>
          </div>

          <div className="card">
            <p>Current Streak</p>
            <h2>{user?.currentStreak || 1} Days</h2>
          </div>

          <div className="card">
            <p>Longest Streak</p>
            <h2>{user?.longestStreak || 1} Days</h2>
          </div>
        </div>

        {/* Bottom Panels */}
        <div
          className="sections"
          style={{ marginTop: "24px" }}
        >

          {/* Low Stock Alerts */}
          <div className="panel">

            <h2>Low Stock Alerts</h2>

            {lowStockProducts.length === 0 ? (

              <p>All products are sufficiently stocked.</p>

            ) : (

              <>
                {(showAllLowStock
                  ? lowStockProducts
                  : lowStockProducts.slice(0, 5)
                ).map((product) => (

                  <div
                    key={product._id}
                    className="low-stock-item"
                  >

                    <div>
                      <strong>{product.name}</strong>
                      <br />
                      <small>{product.productId}</small>
                    </div>

                    <span className="low-stock-count">
                      {product.quantity} left
                    </span>

                  </div>

                ))}

                {lowStockProducts.length > 5 && (

                  <button
                    className="view-more-btn"
                    onClick={() =>
                      setShowAllLowStock(!showAllLowStock)
                    }
                  >
                    {showAllLowStock
                      ? "View Less ▲"
                      : "View More ▼"}
                  </button>

                )}

              </>

            )}

          </div>

          {/* Recent Products */}
          <div className="panel">

            <h2>Recent Products</h2>

            {products.length === 0 ? (

              <p>No products found.</p>

            ) : (

              <>
                {(showAllRecent
                  ? [...products].sort(
                      (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                    )
                  : [...products]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt) -
                          new Date(a.createdAt)
                      )
                      .slice(0, 5)
                ).map((product) => (

                  <div
                    key={product._id}
                    className="recent-product"
                  >
                    <strong>{product.name}</strong>
                  </div>

                ))}

                {products.length > 5 && (
                  <button
                    className="view-more-btn"
                    onClick={() =>
                      setShowAllRecent(!showAllRecent)
                    }
                  >
                    {showAllRecent
                      ? "View Less ▲"
                      : "View More ▼"}
                  </button>
                )}
              </>

            )}

          </div>

        </div>

      </div>

      <FloatingAssistant />
    </div>
  );
}

export default Dashboard;