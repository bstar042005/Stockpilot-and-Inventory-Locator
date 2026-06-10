import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="left-panel">
        <div className="logo">
          <h2>AI Warehouse</h2>
        </div>

        <div className="hero">
          <h1>
            "Intelligent inventory management that keeps your warehouse
            operations running smoothly."
          </h1>

          <div className="stats">
            <div className="card">
              <h2>50,000+</h2>
              <p>Products Tracked</p>
            </div>

            <div className="card">
              <h2>99.9%</h2>
              <p>Uptime</p>
            </div>

            <div className="card">
              <h2>200+</h2>
              <p>Warehouses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="login-box">
          <h1>Welcome back</h1>
          <p>Sign in to your account</p>

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
          />

          <button>
            Sign In
          </button>

          <p className="register">
            Don't have an account?
            <span> Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;