import { useState } from "react";
import { login, getCurrentUser } from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const data = await login(username, password);

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      const user = await getCurrentUser();

      localStorage.setItem("account_type", user.account_type);

      if (user.account_type === "company") {
        navigate("/company/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-header">
          <div className="logo-icon">AI</div>

          <h1>AI Job Tracker</h1>

          <p>
            Find the right opportunity with AI-powered
            job matching.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Username</label>

            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            className="btn btn-primary auth-button"
            type="submit"
          >
            Sign In
          </button>

        </form>

        {message && (
          <div className="message message-error">
            {message}
          </div>
        )}

        <div className="auth-footer">
          <span>Don't have an account?</span>

          <button
            className="link-button"
            type="button"
            onClick={() => navigate("/register")}
          >
            Create an account
          </button>
        </div>

      </div>
    </div>
  );
}

export default Login;