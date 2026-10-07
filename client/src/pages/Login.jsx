import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch(API + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      localStorage.setItem("adminPassword", password);
      navigate("/admin");
    } else {
      setError("Wrong username or password");
    }
  }

  return (
    <div className="auth-wrap">
      <form className="form auth-card" onSubmit={handleLogin}>
        <h1>Admin login</h1>
        <p className="muted">Sign in to manage events and announcements.</p>
        {error && <p className="error">{error}</p>}
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="btn btn-primary">Log in</button>
      </form>
    </div>
  );
}

export default Login;
