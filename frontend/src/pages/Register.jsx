import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Register.css";
import { Eye, EyeOff } from "lucide-react";
import inventoryLogo from "../assets/inventory-logo.png";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker");

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SEND OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/send-otp", {
        name,
        email,
        password,
        role,
      });

      console.log(res.data);
      alert("OTP sent to your email!");
      setShowOtp(true);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to send OTP"
      );
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    try {
      const res = await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      console.log(res.data);
      alert("Account Created Successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "OTP Verification Failed"
      );
    }
  };

  return (
    <div className="login-container">

      {/* LEFT PANEL */}

      <div className="left-panel">

        <div className="logo">
          <img
            src={inventoryLogo}
            alt="AI Warehouse"
            className="logo-image"
          />

          <h2>AI Warehouse</h2>
        </div>

        <div className="hero-content">

          <h3>Smart Inventory Management</h3>

          <p>
            Manage inventory, locate products,
            monitor warehouse stock and simplify
            daily warehouse operations using AI.
          </p>

          <ul className="feature-list">
            <li>Real-time Inventory Tracking</li>
            <li>AI Warehouse Assistant</li>
            <li>Smart Product Locator</li>
            <li>QR Support</li>
          </ul>

        </div>

        {/* <div className="version">
          AI Warehouse Management System
        </div> */}

      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">

        <div className="login-box">

          <h1>Create Account</h1>

          <form onSubmit={handleSendOtp}>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={showOtp}
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={showOtp}
            />

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={showOtp}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2} />
                ) : (
                  <Eye size={20} strokeWidth={2} />
                )}
              </button>

            </div>

            <label>Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              disabled={showOtp}
            >
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </select>

            {!showOtp ? (
              <button
                type="submit"
                className="signin-btn"
              >
                Send OTP
              </button>
            ) : (
              <>
                <label>Enter OTP</label>

                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                <button
                  type="button"
                  className="signin-btn"
                  onClick={handleVerifyOtp}
                >
                  Verify OTP
                </button>
              </>
            )}

          </form>

          <div className="register-link">
            Already have an account?
            <span onClick={() => navigate("/")}>
              Login
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;