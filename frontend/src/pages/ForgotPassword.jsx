import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import API from "../services/api";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const [otpVerified, setOtpVerified] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ======================
  // SEND OTP
  // ======================

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email,
      });

      alert(res.data.message);

      setShowOtp(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to send OTP"
      );
    }
  };

  // ======================
  // VERIFY OTP
  // ======================

  const handleVerifyOtp = async () => {
    try {
      const res = await API.post(
        "/auth/verify-reset-otp",
        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      setOtpVerified(true);

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    }
  };

  // ======================
  // RESET PASSWORD
  // ======================

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await API.post(
        "/auth/reset-password",
        {
          email,
          password: newPassword,
        }
      );

      alert(res.data.message);

      navigate("/");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to reset password"
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
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={showOtp}
          />

          {!showOtp ? (

            <button type="submit">
              Send OTP
            </button>

          ) : !otpVerified ? (

            <>

              <label>OTP</label>

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                type="button"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </button>

            </>

          ) : (

            <>

              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
              />

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>

            </>

          )}

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