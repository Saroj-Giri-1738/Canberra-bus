import "./AdminPages.css";
import { FaRoute, FaMapMarkedAlt, FaClock } from "react-icons/fa";

export default function ManageRoutes() {
  const routes = [
    { route: "Canberra City → Belconnen", stops: "8 stops", time: "08:30 AM" },
    { route: "ANU → Civic", stops: "5 stops", time: "10:00 AM" },
    { route: "Woden → Airport", stops: "6 stops", time: "11:20 AM" },
  ];

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Routes</h1>
          <p>Monitor route planning, departure times, and stop information.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <h2>Route Management</h2>
        <p>Review and update all current route details.</p>

        <div className="admin-record-list">
          {routes.map((item, index) => (
            <div className="admin-record-card" key={index}>
              <div className="admin-record-top">
                <h3>{item.route}</h3>
                <span className="admin-status-pill admin-status-active">Active</span>
              </div>

              <div className="admin-record-meta">
                <span><FaMapMarkedAlt /> {item.stops}</span>
                <span><FaClock /> {item.time}</span>
                <span><FaRoute /> Route Available</span>
              </div>

              <div className="admin-action-row">
                <button className="admin-page-btn">Edit Route</button>
                <button className="admin-page-btn secondary">View Stops</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}