import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import CountUp from "react-countup";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async () => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      await axios.post("http://localhost:3000/users", {
        name,
        email,
      });

      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1> DevOps User Management Dashboard</h1>
      </div>

      <div className="stats">
        <div className="stat-card">
          <p>Total Users</p>
          <h2>{users.length}</h2>
        </div>
      </div>

      <div className="form-card">
        <div className="form">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="add-btn" onClick={addUser}>
            ➕ Add User
          </button>
        </div>
      </div>

      <div className="user-section">
        <h2>👥 Registered Users</h2>

        {users.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
            }}
          >
            No users found
          </div>
        ) : (
          users.map((user) => (
            <div className="user-card" key={user._id}>
              <div className="user-info">
                <div className="avatar">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteUser(user._id)}
              >
                🗑 Delete
              </button>
            </div>
          ))
        )}
      </div>

      <div className="footer">
        
      </div>
    </div>
  );
}

export default App;