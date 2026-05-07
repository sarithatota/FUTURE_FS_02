import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      window.location = "/dashboard";
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button onClick={login}>Login</button>

        <p className="link" onClick={() => window.location = "/register"}>
          Create new account
        </p>
      </div>
    </div>
  );
}

export default Login;
