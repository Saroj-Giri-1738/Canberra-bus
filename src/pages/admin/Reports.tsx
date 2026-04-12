import "./AdminPages.css";
import { FaChartBar, FaBusAlt, FaUsers, FaClipboardList } from "react-icons/fa";

export default function Reports() {
  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Reports</h1>
          <p>View platform summaries, fleet activity, and user engagement reports.</p>
        </div>
      </section>

      <section className="admin-summary-grid">
        <div className="admin-summary-card">
          <h3>74</h3>
          <p>Trips Completed Today</p>
        </div>
        <div className="admin-summary-card">
          <h3>148</h3>
          <p>Bookings Today</p>
        </div>
        <div className="admin-summary-card">
          <h3>40</h3>
          <p>Fleet in System</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <h2>Report Overview</h2>
        <p>Recent key reporting indicators for the transport platform.</p>

        <div className="admin-record-list">
          <div className="admin-record-card">
            <div className="admin-record-top">
              <h3>Fleet Performance</h3>
              <span className="admin-status-pill admin-status-active">Updated</span>
            </div>
            <div className="admin-record-meta">
              <span><FaBusAlt /> 40 buses monitored</span>
              <span><FaClipboardList /> 2 maintenance flags</span>
            </div>
          </div>

          <div className="admin-record-card">
            <div className="admin-record-top">
              <h3>User Engagement</h3>
              <span className="admin-status-pill admin-status-active">Updated</span>
            </div>
            <div className="admin-record-meta">
              <span><FaUsers /> 520 users active</span>
              <span><FaChartBar /> 12% monthly growth</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}