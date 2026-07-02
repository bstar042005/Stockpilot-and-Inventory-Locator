import { useNavigate, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiPackage,
  FiMap,
  FiBarChart2,
  FiSettings,
  FiClock,
} from "react-icons/fi";

import { trackLogout } from "../analytics/events";
import { createActivity } from "../services/activityService";
import inventoryLogo from "../assets/inventory-logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = async () => {
    try {
      trackLogout(user);

      await createActivity({
        user: user?.name,
        role: user?.role,
        action: "User Logged Out",
        productName: "",
        productId: "",
        details: "User logged out of the system",
      });
    } catch (err) {
      console.error(err);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("name");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="sidebar">

      {/* LOGO */}

      <div className="logo">

        <img
          src={inventoryLogo}
          alt="AI Warehouse"
          className="logo-image"
        />

        <div>
          <h2>Mahakaushal Traders</h2>
        </div>

      </div>

      {/* MENU */}

      <div
        className={`menu-item ${
          location.pathname === "/dashboard" ? "active" : ""
        }`}
        onClick={() => navigate("/dashboard")}
      >
        <FiGrid />
        <span>Dashboard</span>
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/inventory" ? "active" : ""
        }`}
        onClick={() => navigate("/inventory")}
      >
        <FiPackage />
        <span>Inventory</span>
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/warehouse-map" ? "active" : ""
        }`}
        onClick={() => navigate("/warehouse-map")}
      >
        <FiMap />
        <span>Warehouse Map</span>
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/analytics" ? "active" : ""
        }`}
        onClick={() => navigate("/analytics")}
      >
        <FiBarChart2 />
        <span>Analytics</span>
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/activity" ? "active" : ""
        }`}
        onClick={() => navigate("/activity")}
      >
        <FiClock />
        <span>Activity</span>
      </div>

      <div
        className={`menu-item ${
          location.pathname === "/settings" ? "active" : ""
        }`}
        onClick={() => navigate("/settings")}
      >
        <FiSettings />
        <span>Settings</span>
      </div>

      {/* PROFILE */}

      <div className="profile">

        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-info">
          <h4>{user?.name}</h4>
          <p>{user?.role}</p>
        </div>

      </div>

      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={logout}
      >
        Sign Out
      </button>

    </div>
  );
}

export default Sidebar;