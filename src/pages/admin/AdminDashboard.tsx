import "./AdminDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBusAlt,
  FaRoute,
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaUserShield,
  FaCog,
  FaExclamationTriangle,
  FaEnvelope,
  FaCheckCircle,
  FaTrash,
} from "react-icons/fa";

type ContactMessage = {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  const adminName =
    JSON.parse(localStorage.getItem("user") || "{}")?.fullName || "Admin";

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const savedMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]"
    );
    setContactMessages(savedMessages);
  }, []);

  const handleAcknowledge = (id: number) => {
    const updatedMessages = contactMessages.map((msg) =>
      msg.id === id ? { ...msg, status: "Acknowledged" } : msg
    );

    setContactMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const handleDelete = (id: number) => {
    const updatedMessages = contactMessages.filter((msg) => msg.id !== id);

    setContactMessages(updatedMessages);
    localStorage.setItem("contactMessages", JSON.stringify(updatedMessages));
  };

  const stats = [
    { title: "Total Buses", value: "40", icon: <FaBusAlt /> },
    { title: "Active Routes", value: "25", icon: <FaRoute /> },
    { title: "Registered Users", value: "520", icon: <FaUsers /> },
    { title: "Reports Generated", value: "18", icon: <FaChartBar /> },
  ];

  const notices = [
    "2 buses require maintenance review this week",
    "New user registrations increased by 12% this month",
    "Route schedule update pending approval",
  ];

  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard-hero">
        <div>
          <p className="admin-eyebrow">Administrator dashboard</p>
          <h1>Welcome back, {adminName}</h1>
          <p className="admin-dashboard-subtext">
            Manage buses, routes, users, and operational reports from one
            central control panel.
          </p>
        </div>

        <div className="admin-hero-summary">
          <span className="admin-summary-label">System Overview</span>
          <h3>Operations Running Smoothly</h3>
          <p>25 active routes • 40 buses • 520 users in system</p>
          <span className="admin-summary-pill">Admin Access Active</span>
        </div>
      </section>

      <section className="admin-stats-grid">
        {stats.map((item) => (
          <div className="admin-stat-card" key={item.title}>
            <div className="admin-stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-main-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="admin-eyebrow">Quick management</p>
              <h2>Admin tools</h2>
            </div>
          </div>

          <div className="admin-tools-grid">
            <a href="/admin/buses" className="admin-tool-card">
              <FaBusAlt className="admin-tool-icon" />
              <h3>Manage Buses</h3>
              <p>Update bus details, availability, and assignments.</p>
            </a>

            <a href="/admin/routes" className="admin-tool-card">
              <FaRoute className="admin-tool-icon" />
              <h3>Manage Routes</h3>
              <p>Control stop information, route planning, and schedules.</p>
            </a>

            <a href="/admin/users" className="admin-tool-card">
              <FaUserShield className="admin-tool-icon" />
              <h3>Manage Users</h3>
              <p>Monitor passenger, driver, and admin accounts.</p>
            </a>

            <a href="/admin/reports" className="admin-tool-card">
              <FaClipboardList className="admin-tool-icon" />
              <h3>Reports</h3>
              <p>Review platform activity and transport performance.</p>
            </a>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="admin-eyebrow">System notices</p>
              <h2>Recent alerts</h2>
            </div>
          </div>

          <div className="admin-notice-list">
            {notices.map((notice, index) => (
              <div className="admin-notice-item" key={index}>
                <FaExclamationTriangle className="admin-notice-icon" />
                <span>{notice}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="admin-bottom-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="admin-eyebrow">Operations summary</p>
              <h2>Today’s activity</h2>
            </div>
          </div>

          <div className="admin-activity-card">
            <div className="admin-activity-row">
              <span>Buses dispatched</span>
              <strong>32</strong>
            </div>
            <div className="admin-activity-row">
              <span>Trips completed</span>
              <strong>74</strong>
            </div>
            <div className="admin-activity-row">
              <span>New bookings</span>
              <strong>148</strong>
            </div>
            <div className="admin-activity-row">
              <span>Open issues</span>
              <strong>03</strong>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <p className="admin-eyebrow">Admin actions</p>
              <h2>Quick access</h2>
            </div>
          </div>

          <div className="admin-action-list">
            <button
              className="admin-primary-btn"
              onClick={() => navigate("/admin/buses")}
            >
              <FaBusAlt />
              Add New Bus
            </button>

            <button
              className="admin-primary-btn secondary"
              onClick={() => navigate("/admin/routes")}
            >
              <FaRoute />
              Create Route
            </button>

            <button
              className="admin-primary-btn secondary"
              onClick={() => navigate("/admin/users")}
            >
              <FaUsers />
              Review Users
            </button>

            <button
              className="admin-primary-btn secondary"
              onClick={() =>
                alert("System Settings can be added in the next iteration.")
              }
            >
              <FaCog />
              System Settings
            </button>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <p className="admin-eyebrow">Contact messages</p>
            <h2>User enquiries</h2>
          </div>
        </div>

        {contactMessages.length === 0 ? (
          <div className="admin-empty-messages">
            <FaEnvelope className="admin-message-icon" />
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <div className="admin-message-list">
            {contactMessages.map((msg) => (
              <div className="admin-message-card" key={msg.id}>
                <div className="admin-message-top">
                  <div>
                    <h3>{msg.subject}</h3>
                    <p className="admin-message-meta">
                      {msg.fullName} • {msg.email}
                    </p>
                  </div>

                  <span
                    className={`admin-message-status ${
                      msg.status === "Acknowledged"
                        ? "acknowledged"
                        : "new-status"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>

                <p className="admin-message-body">{msg.message}</p>

                <div className="admin-message-date">{msg.date}</div>

                <div className="admin-message-actions">
                  <button
                    className="admin-message-btn acknowledge-btn"
                    onClick={() => handleAcknowledge(msg.id)}
                    disabled={msg.status === "Acknowledged"}
                  >
                    <FaCheckCircle />
                    {msg.status === "Acknowledged"
                      ? "Acknowledged"
                      : "Acknowledge"}
                  </button>

                  <button
                    className="admin-message-btn delete-btn"
                    onClick={() => handleDelete(msg.id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}