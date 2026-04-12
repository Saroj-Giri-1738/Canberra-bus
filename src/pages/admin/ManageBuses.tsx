import "./AdminPages.css";
import { FaBusAlt, FaCheckCircle, FaTools } from "react-icons/fa";

export default function ManageBuses() {
  const buses = [
    { name: "Bus No. CB-12", route: "Canberra City → Belconnen", status: "Active" },
    { name: "Bus No. CB-08", route: "ANU → Civic", status: "Maintenance" },
    { name: "Bus No. CB-15", route: "Woden → Airport", status: "Active" },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Buses</h1>
          <p>Review fleet status, assignments, and operational readiness.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <h2>Fleet Overview</h2>
        <p>Current buses and system status are listed below.</p>

        <div className="admin-record-list">
          {buses.map((bus, index) => (
            <div className="admin-record-card" key={index}>
              <div className="admin-record-top">
                <h3>{bus.name}</h3>
                <span
                  className={`admin-status-pill ${
                    bus.status === "Active"
                      ? "admin-status-active"
                      : "admin-status-warning"
                  }`}
                >
                  {bus.status}
                </span>
              </div>

              <div className="admin-record-meta">
                <span><FaBusAlt /> {bus.route}</span>
              </div>

              <div className="admin-action-row">
                <button className="admin-page-btn">
                  <FaCheckCircle />
                  Update Status
                </button>
                <button className="admin-page-btn secondary">
                  <FaTools />
                  Schedule Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}