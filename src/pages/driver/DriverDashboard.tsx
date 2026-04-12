import "./DriverDashboard.css";
import {
  FaBusAlt,
  FaCalendarAlt,
  FaClipboardCheck,
  FaRoute,
  FaArrowRight,
  FaClock,
  FaMapMarkedAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaUserCheck,
} from "react-icons/fa";

export default function DriverDashboard() {
  const driverName =
    JSON.parse(localStorage.getItem("user") || "{}")?.fullName || "Driver";

  const stats = [
    { title: "Assigned Routes", value: "04", icon: <FaRoute /> },
    { title: "Trips Today", value: "03", icon: <FaBusAlt /> },
    { title: "Attendance", value: "Marked", icon: <FaUserCheck /> },
    { title: "Completed Runs", value: "12", icon: <FaClipboardCheck /> },
  ];

  const alerts = [
    "Route update for Canberra City → Belconnen at 8:30 AM",
    "Bus inspection reminder before afternoon trip",
    "Traffic notice near Civic interchange",
  ];

  return (
    <div className="driver-dashboard">
      <section className="driver-dashboard-hero">
        <div>
          <p className="driver-eyebrow">Driver dashboard</p>
          <h1>Welcome back, {driverName}</h1>
          <p className="driver-dashboard-subtext">
            Manage assigned routes, attendance, and daily driving activities
            from one organized dashboard.
          </p>
        </div>

        <div className="driver-hero-status-card">
          <span className="driver-status-label">Today’s Status</span>
          <h3>Ready for Duty</h3>
          <p>Morning attendance recorded • First trip starts at 08:30 AM</p>
          <span className="driver-status-pill">On Schedule</span>
        </div>
      </section>

      <section className="driver-stats-grid">
        {stats.map((item) => (
          <div className="driver-stat-card" key={item.title}>
            <div className="driver-stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="driver-main-grid">
        <div className="driver-panel">
          <div className="driver-panel-head">
            <div>
              <p className="driver-eyebrow">Next assigned trip</p>
              <h2>Upcoming route</h2>
            </div>
          </div>

          <div className="driver-next-trip-card">
            <div className="driver-trip-route-row">
              <div>
                <span className="driver-trip-label">From</span>
                <h3>Canberra City</h3>
              </div>

              <FaArrowRight className="driver-trip-arrow" />

              <div>
                <span className="driver-trip-label">To</span>
                <h3>Belconnen</h3>
              </div>
            </div>

            <div className="driver-trip-meta-grid">
              <div className="driver-trip-meta-item">
                <FaCalendarAlt />
                <span>06 Apr 2026</span>
              </div>
              <div className="driver-trip-meta-item">
                <FaClock />
                <span>08:30 AM</span>
              </div>
              <div className="driver-trip-meta-item">
                <FaBusAlt />
                <span>Bus No. CB-12</span>
              </div>
              <div className="driver-trip-meta-item">
                <FaMapMarkedAlt />
                <span>Platform 3</span>
              </div>
            </div>

            <div className="driver-trip-footer">
              <span className="driver-chip success">Confirmed</span>
              <button className="driver-primary-btn">Start Route</button>
            </div>
          </div>
        </div>

        <div className="driver-panel">
          <div className="driver-panel-head">
            <div>
              <p className="driver-eyebrow">Notifications</p>
              <h2>Driver alerts</h2>
            </div>
          </div>

          <div className="driver-alert-list">
            {alerts.map((alert, index) => (
              <div className="driver-alert-item" key={index}>
                <FaExclamationCircle className="driver-alert-icon" />
                <span>{alert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="driver-bottom-grid">
        <div className="driver-panel">
          <div className="driver-panel-head">
            <div>
              <p className="driver-eyebrow">Quick actions</p>
              <h2>Driver tools</h2>
            </div>
          </div>

          <div className="driver-quick-grid">
            <a href="/driver/assignedroutes" className="driver-quick-card">
              <FaRoute className="driver-quick-icon" />
              <h3>Assigned Routes</h3>
              <p>Check your route list and departure schedule.</p>
            </a>

            <a href="/driver/attendance" className="driver-quick-card">
              <FaUserCheck className="driver-quick-icon" />
              <h3>Attendance</h3>
              <p>Mark your shift attendance and availability.</p>
            </a>

            <a href="/" className="driver-quick-card">
              <FaCheckCircle className="driver-quick-icon" />
              <h3>Trip Status</h3>
              <p>Review current duty progress and route updates.</p>
            </a>

            <a href="/" className="driver-quick-card">
              <FaBusAlt className="driver-quick-icon" />
              <h3>Vehicle Info</h3>
              <p>View assigned bus details and inspection reminders.</p>
            </a>
          </div>
        </div>

        <div className="driver-panel">
          <div className="driver-panel-head">
            <div>
              <p className="driver-eyebrow">Today’s checklist</p>
              <h2>Before departure</h2>
            </div>
          </div>

          <div className="driver-checklist">
            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>Attendance marked</span>
            </div>
            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>Bus assignment confirmed</span>
            </div>
            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>Route and stop list reviewed</span>
            </div>
            <div className="driver-check-item">
              <FaExclamationCircle className="check-warn" />
              <span>Pre-trip inspection pending</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}