import React, { useEffect, useState } from "react";
import API from "../services/api";
import LeadForm from "../components/LeadForm";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  const fetchLeads = async () => {
    const res = await API.get("/leads", {
      headers: { Authorization: localStorage.getItem("token") }
    });
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    await API.delete("/leads/" + id, {
      headers: { Authorization: localStorage.getItem("token") }
    });
    fetchLeads();
  };

  const editLead = async (id) => {
    const name = prompt("New Name:");
    const email = prompt("New Email:");

    await API.put("/leads/" + id,
      { name, email },
      {
        headers: { Authorization: localStorage.getItem("token") }
      }
    );
    fetchLeads();
  };

  // 🔍 Filtered Leads
  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={dark ? "container dark" : "container light"}>

      {/* TOP BUTTONS */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="logout" onClick={() => {
          localStorage.removeItem("token");
          window.location = "/";
        }}>
          Logout
        </button>

        <button onClick={() => setDark(!dark)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h2>CRM Dashboard</h2>

      {/* 📊 Stats */}
      <div className="stats">
        <div className="stat-card">
          <h3>Total Leads</h3>
          <p>{leads.length}</p>
        </div>
      </div>

      {/* ➕ FORM */}
      <LeadForm refresh={fetchLeads} />

      {/* 🔍 SEARCH BELOW FORM */}
      <input
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 📋 LIST */}
      {filteredLeads.length === 0 ? (
        <p style={{ textAlign: "center" }}>No results found</p>
      ) : (
        filteredLeads.map(l => (
          <div className="card" key={l._id}>
            <div>
              <strong>{l.name}</strong><br />
              {l.email}
            </div>

            <div>
              <button onClick={() => editLead(l._id)}>Edit</button>
              <button onClick={() => deleteLead(l._id)}>Delete</button>
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;
