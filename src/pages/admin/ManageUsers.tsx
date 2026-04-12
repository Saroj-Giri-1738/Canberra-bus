import "./AdminPages.css";
import { FaUsers, FaUserShield, FaIdBadge } from "react-icons/fa";

export default function ManageUsers() {
  const users = [
    { name: "John Passenger", role: "Passenger", email: "passenger@test.com" },
    { name: "Emma Driver", role: "Driver", email: "driver@test.com" },
    { name: "Sarah Admin", role: "Admin", email: "admin@test.com" },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Users</h1>
          <p>Track platform accounts and role-based access across the system.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <h2>User Directory</h2>
        <p>Review user roles and account information below.</p>

        <div className="admin-record-list">
          {users.map((user, index) => (
            <div className="admin-record-card" key={index}>
              <div className="admin-record-top">
                <h3>{user.name}</h3>
                <span className="admin-status-pill admin-status-active">{user.role}</span>
              </div>

              <div className="admin-record-meta">
                <span><FaUsers /> {user.email}</span>
                <span>
                  {user.role === "Driver" ? <FaIdBadge /> : <FaUserShield />} {user.role} Access
                </span>
              </div>

              <div className="admin-action-row">
                <button className="admin-page-btn">Edit User</button>
                <button className="admin-page-btn secondary">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}