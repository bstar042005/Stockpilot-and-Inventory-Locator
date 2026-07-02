import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import API from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post(
      "/auth/forgot-password",
      {
        email,
      }
    );

    alert(res.data.message);

    setShowOtp(true);

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Failed to send OTP"
    );

  }
};

  return (
    <div className="forgot-container">

      <div className="forgot-box">

        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address.
          We'll send you an OTP to reset your password.
        </p>

        <form onSubmit={handleSendOtp}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit">
            Send OTP
          </button>

        </form>

        <div className="back-login">
          <span onClick={() => navigate("/")}>
            ← Back to Login
          </span>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;