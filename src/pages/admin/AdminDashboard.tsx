import { useEffect, useState } from "react";
import "./AdminPages.css";
import { getCurrentUser } from "../../services/api";
import {
  FaBell,
  FaBusAlt,
  FaCheckCircle,
  FaClipboardCheck,
  FaRoute,
  FaSyncAlt,
  FaTicketAlt,
  FaTools,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import {
  clearAdminNotifications,
  deleteAdminNotification,
  getAdminNotifications,
  getAdminStats,
  markAdminNotificationAsRead,
  type AdminNotification,
  type AdminStats,
} from "../../services/adminApi";

export default function AdminDashboard() {
  const user = getCurrentUser();
  const adminName = user?.full_name || "Admin";

  const [stats, setStats] = useState<AdminStats | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const statsData = await getAdminStats();
      const notificationData = await getAdminNotifications();

      setStats(statsData);
      setNotifications(notificationData);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load admin dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAdminNotificationAsRead(id);
      await loadDashboard();
    } catch (error: any) {
      alert(error.message || "Failed to mark notification as read");
    }
  };

  const handleDeleteNotification = async (id: number) => {
    try {
      await deleteAdminNotification(id);
      await loadDashboard();
    } catch (error: any) {
      alert(error.message || "Failed to delete notification");
    }
  };

  const handleClearAllNotifications = async () => {
    const confirmed = window.confirm("Are you sure you want to clear all alerts?");

    if (!confirmed) return;

    try {
      await clearAdminNotifications();
      await loadDashboard();
    } catch (error: any) {
      alert(error.message || "Failed to clear notifications");
    }
  };

  const unreadCount = notifications.filter(
    (notification) => Number(notification.is_read) === 0
  ).length;

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
          <button className="admin-btn" onClick={loadDashboard}>
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
      title: "Unread Alerts",
      value: unreadCount,
      icon: <FaBell />,
    },
  ];

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div>
          <span className="admin-badge">Admin Panel</span>
          <h1>Welcome back, {adminName}</h1>
          <p>
            Monitor Canberra Bus Company users, buses, routes, bookings, alerts,
            and daily driver operations.
          </p>
        </div>

        <button className="admin-btn light" onClick={loadDashboard}>
          <FaSyncAlt />
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

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <span className="admin-badge">Database Alerts</span>
            <h2>Admin Notifications</h2>
          </div>

          <div className="admin-alert-actions">
            <strong>{unreadCount} unread</strong>

            {notifications.length > 0 && (
              <button
                className="admin-btn secondary"
                onClick={handleClearAllNotifications}
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="admin-empty-alerts">
            <FaBell />
            <h3>No alerts yet</h3>
            <p>
              Passenger booking and feedback alerts will appear here after users
              make changes.
            </p>
          </div>
        ) : (
          <div className="admin-alert-list">
            {notifications.map((notification) => (
              <div
                className={`admin-alert-card ${
                  Number(notification.is_read) === 0
                    ? "admin-alert-unread"
                    : "admin-alert-read"
                }`}
                key={notification.id}
              >
                <div className="admin-alert-icon">
                  <FaBell />
                </div>

                <div className="admin-alert-content">
                  <div className="admin-alert-title-row">
                    <h3>{notification.title}</h3>

                    <span
                      className={`admin-alert-status ${
                        Number(notification.is_read) === 0
                          ? "admin-alert-status-new"
                          : "admin-alert-status-read"
                      }`}
                    >
                      {Number(notification.is_read) === 0 ? "New" : "Read"}
                    </span>
                  </div>

                  <p>{notification.message}</p>

                  <small>
                    {new Date(notification.created_at).toLocaleString("en-AU")}
                  </small>
                </div>

                <div className="admin-alert-buttons">
                  {Number(notification.is_read) === 0 && (
                    <button
                      className="admin-icon-btn"
                      title="Mark as read"
                      onClick={() => handleMarkAsRead(notification.id)}
                    >
                      <FaCheckCircle />
                    </button>
                  )}

                  <button
                    className="admin-icon-btn danger"
                    title="Delete alert"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <FaTrash />
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