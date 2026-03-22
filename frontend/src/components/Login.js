import React, { useState } from "react";
import API_URL from "../config";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        onLogin(data.username);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <span className="login-icon">🛡️</span>
          <h2>Admin Login</h2>
          <p>Mini Compliance Tracker</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="login-hint">
          <strong>Demo Credentials:</strong><br/>
          User: <code>admin</code> | Pass: <code>admin123</code>
        </div>
      </div>
    </div>
  );
}

export default Login;
