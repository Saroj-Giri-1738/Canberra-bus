import { useEffect, useState } from "react";
import "./AdminPages.css";
import {
  FaUsers,
  FaUserTie,
  FaBusAlt,
  FaRoute,
  FaTicketAlt,
  FaClipboardCheck,
  FaTools,
  FaUserShield,
} from "react-icons/fa";
import { getAdminStats, type AdminStats } from "../../services/adminApi";

export default function AdminDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const adminName = storedUser?.full_name || storedUser?.fullName || "Admin";

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadStats = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getAdminStats();
      setStats(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Loading admin dashboard...</h2>
        </div>
      </div>
    );
  }

  if (errorMessage || !stats) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="admin-btn" onClick={loadStats}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.total_users,
      icon: <FaUsers />,
    },
    {
      title: "Drivers",
      value: stats.total_drivers,
      icon: <FaUserTie />,
    },
    {
      title: "Passengers",
      value: stats.total_passengers,
      icon: <FaUsers />,
    },
    {
      title: "Admins",
      value: stats.total_admins,
      icon: <FaUserShield />,
    },
    {
      title: "Total Buses",
      value: stats.total_buses,
      icon: <FaBusAlt />,
    },
    {
      title: "Active Routes",
      value: stats.active_routes,
      icon: <FaRoute />,
    },
    {
      title: "Bookings",
      value: stats.total_bookings,
      icon: <FaTicketAlt />,
    },
    {
      title: "Today Assignments",
      value: stats.today_assignments,
      icon: <FaClipboardCheck />,
    },
  ];

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div>
          <span className="admin-badge">Admin Panel</span>
          <h1>Welcome back, {adminName}</h1>
          <p>
            Monitor Canberra Bus Company users, buses, routes, bookings, and
            daily driver operations from your MySQL backend.
          </p>
        </div>

        <button className="admin-btn light" onClick={loadStats}>
          Refresh Dashboard
        </button>
      </section>

      <section className="admin-stats-grid">
        {statCards.map((card) => (
          <div className="admin-stat-card" key={card.title}>
            <div className="admin-stat-icon">{card.icon}</div>
            <div>
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-dashboard-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Operations</span>
              <h2>Fleet Summary</h2>
            </div>
          </div>

          <div className="admin-summary-list">
            <div className="admin-summary-item">
              <FaBusAlt />
              <span>Active buses</span>
              <strong>{stats.active_buses}</strong>
            </div>

            <div className="admin-summary-item">
              <FaTools />
              <span>Maintenance buses</span>
              <strong>{stats.maintenance_buses}</strong>
            </div>

            <div className="admin-summary-item">
              <FaRoute />
              <span>Total routes</span>
              <strong>{stats.total_routes}</strong>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Today</span>
              <h2>Trip Progress</h2>
            </div>
          </div>

          <div className="admin-summary-list">
            <div className="admin-summary-item">
              <FaClipboardCheck />
              <span>Assigned trips today</span>
              <strong>{stats.today_assignments}</strong>
            </div>

            <div className="admin-summary-item">
              <FaClipboardCheck />
              <span>Completed trips today</span>
              <strong>{stats.completed_trips}</strong>
            </div>

            <div className="admin-summary-item">
              <FaTicketAlt />
              <span>Total bookings</span>
              <strong>{stats.total_bookings}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}