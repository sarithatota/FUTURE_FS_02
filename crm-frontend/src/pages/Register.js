import React, { useState } from "react";
import API from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", { username, password });
      alert("Registered successfully");
      window.location = "/";
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button onClick={register}>Register</button>

        <p className="link" onClick={() => window.location = "/"}>
          Already have account? Login
        </p>
      </div>
    </div>
  );
}

export default Register;
