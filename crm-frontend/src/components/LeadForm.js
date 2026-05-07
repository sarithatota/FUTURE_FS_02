import React, { useState } from "react";
import API from "../services/api";

function LeadForm({ refresh }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addLead = async () => {
    if (!name || !email) return alert("Fill all fields");

    await API.post("/leads",
      { name, email },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );

    setName("");
    setEmail("");
    refresh();
  };

  return (
    <div className="form-box">
      <h3><span className="plus">+</span> Add New Lead</h3>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter Email" />

      <button onClick={addLead}>Add Lead</button>
    </div>
  );
}

export default LeadForm;
