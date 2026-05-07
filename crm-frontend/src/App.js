import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // ===== PAGE CONTROL =====
  const [page, setPage] = useState("login"); 
  // login | register | home

  // ===== USERS (SIMPLE AUTH) =====
  const [users, setUsers] = useState([]);

  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [currentUser, setCurrentUser] = useState(null);

  // ===== CRM DATA =====
  const [crmData, setCrmData] = useState([]);

  const [crmForm, setCrmForm] = useState({
    name: "",
    email: "",
    website: "",
    date: ""
  });

  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  // ===== LOAD FROM LOCAL STORAGE =====
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("crmData"));
    if (saved) setCrmData(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("crmData", JSON.stringify(crmData));
  }, [crmData]);

  // ================= AUTH HANDLERS =================

  // REGISTER
  const handleRegister = (e) => {
    e.preventDefault();

    setUsers([...users, authForm]);

    alert("Registration Successful!");
    setAuthForm({ name: "", email: "", password: "" });
    setPage("login");
  };

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) =>
        u.email === authForm.email &&
        u.password === authForm.password
    );

    if (user) {
      setCurrentUser(user);
      setPage("home");
    } else {
      alert("Invalid credentials");
    }
  };

  // ================= CRM HANDLERS =================

  // INPUT CHANGE
  const handleChange = (e) => {
    setCrmForm({ ...crmForm, [e.target.name]: e.target.value });
  };

  // ADD / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!crmForm.name || !crmForm.email) return;

    if (editId !== null) {
      setCrmData(
        crmData.map((item) =>
          item.id === editId ? { ...item, ...crmForm } : item
        )
      );
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        ...crmForm
      };
      setCrmData([...crmData, newItem]);
    }

    setCrmForm({ name: "", email: "", website: "", date: "" });
  };

  // DELETE
  const handleDelete = (id) => {
    setCrmData(crmData.filter((item) => item.id !== id));
  };

  // EDIT
  const handleEdit = (item) => {
    setCrmForm(item);
    setEditId(item.id);
  };

  // FILTER
  const filteredData = crmData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= UI =================
  return (
    <div className="app">

      {/* ================= LOGIN ================= */}
      {page === "login" && (
        <div className="auth">
          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            <input
              placeholder="Email"
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />

            <button type="submit">Login</button>
          </form>

          <p onClick={() => setPage("register")}>
            Create new account
          </p>
        </div>
      )}

      {/* ================= REGISTER ================= */}
      {page === "register" && (
        <div className="auth">
          <h2>Register</h2>

          <form onSubmit={handleRegister}>
            <input
              placeholder="Name"
              onChange={(e) =>
                setAuthForm({ ...authForm, name: e.target.value })
              }
            />

            <input
              placeholder="Email"
              onChange={(e) =>
                setAuthForm({ ...authForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setAuthForm({ ...authForm, password: e.target.value })
              }
            />

            <button type="submit">Register</button>
          </form>

          <p onClick={() => setPage("login")}>
            Already have account? Login
          </p>
        </div>
      )}

      {/* ================= HOME (CRM DASHBOARD) ================= */}
      {page === "home" && (
        <div>

          {/* HEADER */}
          <div className="header">
            <h2>Welcome {currentUser?.name}</h2>

            <button onClick={() => setPage("login")}>
              Logout
            </button>
          </div>

          {/* FORM */}
          <form className="form" onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={crmForm.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={crmForm.email}
              onChange={handleChange}
            />

            <input
              name="website"
              placeholder="Website"
              value={crmForm.website}
              onChange={handleChange}
            />

            <input
              name="date"
              type="date"
              value={crmForm.date}
              onChange={handleChange}
            />

            <button type="submit">
              {editId ? "Update" : "Add"}
            </button>
          </form>

          {/* SEARCH */}
          <input
            className="search"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* LIST */}
          <div className="list">
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <div className="card" key={item.id}>
                  <h3>{item.name}</h3>
                  <p>📧 {item.email}</p>
                  <p>🌐 {item.website}</p>
                  <p>📅 {item.date}</p>

                  <div className="actions">
                    <button onClick={() => handleEdit(item)}>
                      Edit ✏️
                    </button>

                    <button onClick={() => handleDelete(item.id)}>
                      Delete 🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No data found</p>
            )}
          </div>

        </div>
      )}

    </div>
  );
}

export default App;
