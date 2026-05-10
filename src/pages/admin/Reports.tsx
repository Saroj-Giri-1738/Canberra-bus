import { useEffect, useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaBell,
  FaBusAlt,
  FaClipboardCheck,
  FaFileAlt,
  FaPaperPlane,
  FaRoute,
  FaStar,
  FaSyncAlt,
  FaTicketAlt,
  FaTrash,
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import {
  clearAdminNotifications,
  deleteAdminFeedback,
  getAdminFeedback,
  getAdminNotifications,
  getAdminStats,
  getFeedbackDisplayEmail,
  getFeedbackDisplayName,
  saveAdminFeedbackResponse,
  type AdminFeedback,
  type AdminNotification,
  type AdminStats,
} from "../../services/adminApi";

export default function Reports() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [feedback, setFeedback] = useState<AdminFeedback[]>([]);
  const [bookingNotifications, setBookingNotifications] = useState<
    AdminNotification[]
  >([]);
  const [responseText, setResponseText] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingResponseId, setSavingResponseId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const loadReports = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const statsData = await getAdminStats();
      const feedbackData = await getAdminFeedback();
      const notificationsData = await getAdminNotifications();

      setStats(statsData);
      setFeedback(feedbackData);
      setBookingNotifications(notificationsData);

      const initialResponses: Record<number, string> = {};
      feedbackData.forEach((item) => {
        initialResponses[item.id] = item.admin_response || "";
      });
      setResponseText(initialResponses);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const averageRating = useMemo(() => {
    if (feedback.length === 0) return 0;

    const total = feedback.reduce((sum, item) => sum + Number(item.rating), 0);
    return total / feedback.length;
  }, [feedback]);

  const unreadNotifications = useMemo(() => {
    return bookingNotifications.filter(
      (notification) => Number(notification.is_read) === 0
    ).length;
  }, [bookingNotifications]);

  const handleDeleteFeedback = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAdminFeedback(id);
      await loadReports();
    } catch (error: any) {
      alert(error.message || "Failed to delete feedback");
    }
  };

  const handleSaveResponse = async (feedbackId: number) => {
    const reply = responseText[feedbackId] || "";

    if (!reply.trim()) {
      alert("Please write a response before saving.");
      return;
    }

    try {
      setSavingResponseId(feedbackId);

      await saveAdminFeedbackResponse(feedbackId, reply);

      alert("Admin response saved successfully.");
      await loadReports();
    } catch (error: any) {
      alert(error.message || "Failed to save admin response");
    } finally {
      setSavingResponseId(null);
    }
  };

  const handleClearNotifications = async () => {
    const confirmed = window.confirm("Clear all booking notifications?");

    if (!confirmed) return;

    try {
      await clearAdminNotifications();
      await loadReports();
    } catch (error: any) {
      alert(error.message || "Failed to clear notifications");
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Loading reports...</h2>
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
          <button className="admin-btn" onClick={loadReports}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const generatedDate = new Date().toLocaleString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="admin-page">
      <section className="admin-report-hero">
        <div>
          <span className="admin-badge">Generated Report</span>
          <h1>System Reports</h1>
          <p>
            Detailed operational report generated for users, fleet, routes,
            bookings, driver activity, admin notifications, and passenger
            feedback.
          </p>
          <small>Last generated: {generatedDate}</small>
        </div>

        <button className="admin-btn light" onClick={loadReports}>
          <FaSyncAlt />
          Refresh Report
        </button>
      </section>

      <section className="admin-report-summary">
        <div className="admin-report-summary-card">
          <FaFileAlt />
          <div>
            <h3>
              {stats.total_users +
                stats.total_buses +
                stats.total_routes +
                stats.total_bookings}
            </h3>
            <p>Total System Records</p>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <FaTicketAlt />
          <div>
            <h3>{stats.total_bookings}</h3>
            <p>Total Ticket Bookings</p>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <FaBell />
          <div>
            <h3>{bookingNotifications.length}</h3>
            <p>Database Alerts</p>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <FaClipboardCheck />
          <div>
            <h3>{stats.completed_trips}</h3>
            <p>Completed Trips Today</p>
          </div>
        </div>

        <div className="admin-report-summary-card">
          <FaStar />
          <div>
            <h3>{averageRating.toFixed(1)}</h3>
            <p>Average Feedback Rating</p>
          </div>
        </div>
      </section>

      <section className="admin-report-grid">
        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">User Report</span>
              <h2>User Breakdown</h2>
            </div>
          </div>

          <div className="admin-report-table">
            <div className="admin-report-row">
              <span>
                <FaUsers /> Total Users
              </span>
              <strong>{stats.total_users}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaUserTie /> Drivers
              </span>
              <strong>{stats.total_drivers}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaUsers /> Passengers
              </span>
              <strong>{stats.total_passengers}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaUserShield /> Admins
              </span>
              <strong>{stats.total_admins}</strong>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Fleet Report</span>
              <h2>Fleet Breakdown</h2>
            </div>
          </div>

          <div className="admin-report-table">
            <div className="admin-report-row">
              <span>
                <FaBusAlt /> Total Buses
              </span>
              <strong>{stats.total_buses}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaBusAlt /> Active Buses
              </span>
              <strong>{stats.active_buses}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaBusAlt /> Maintenance Buses
              </span>
              <strong>{stats.maintenance_buses}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaRoute /> Active Routes
              </span>
              <strong>{stats.active_routes}</strong>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Booking Report</span>
              <h2>Ticket and Booking Summary</h2>
            </div>
          </div>

          <div className="admin-report-table">
            <div className="admin-report-row">
              <span>
                <FaTicketAlt /> Total Bookings
              </span>
              <strong>{stats.total_bookings}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaRoute /> Total Routes
              </span>
              <strong>{stats.total_routes}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaClipboardCheck /> Today Assignments
              </span>
              <strong>{stats.today_assignments}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaClipboardCheck /> Completed Trips
              </span>
              <strong>{stats.completed_trips}</strong>
            </div>
          </div>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Feedback Report</span>
              <h2>Customer Satisfaction</h2>
            </div>
          </div>

          <div className="admin-report-table">
            <div className="admin-report-row">
              <span>
                <FaStar /> Feedback Records
              </span>
              <strong>{feedback.length}</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaStar /> Average Rating
              </span>
              <strong>{averageRating.toFixed(1)} / 5</strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaStar /> Pending Responses
              </span>
              <strong>
                {
                  feedback.filter(
                    (item) => item.response_status === "Pending"
                  ).length
                }
              </strong>
            </div>

            <div className="admin-report-row">
              <span>
                <FaStar /> Responded Feedback
              </span>
              <strong>
                {
                  feedback.filter(
                    (item) => item.response_status === "Responded"
                  ).length
                }
              </strong>
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
            <strong>{unreadNotifications} unread</strong>

            {bookingNotifications.length > 0 && (
              <button
                className="admin-btn light"
                onClick={handleClearNotifications}
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {bookingNotifications.length === 0 ? (
          <div className="admin-report-empty">
            <FaBell />
            <h3>No database alerts</h3>
            <p>
              New bookings, booking edits, and cancellations will appear here
              from the MySQL notifications table.
            </p>
          </div>
        ) : (
          <div className="admin-feedback-list">
            {bookingNotifications.map((notification) => (
              <div className="admin-feedback-card" key={notification.id}>
                <div className="admin-feedback-top">
                  <div>
                    <h3>{notification.title}</h3>
                    <p>{notification.type}</p>
                  </div>

                  <span
                    className={`admin-response-status ${
                      Number(notification.is_read) === 0
                        ? "admin-response-status-pending"
                        : "admin-response-status-done"
                    }`}
                  >
                    {Number(notification.is_read) === 0 ? "New" : "Read"}
                  </span>
                </div>

                <p className="admin-feedback-message">
                  {notification.message}
                </p>

                <small>
                  {new Date(notification.created_at).toLocaleString("en-AU")}
                </small>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <span className="admin-badge">Passenger Feedback</span>
            <h2>Feedback Details</h2>
          </div>

          <strong>{feedback.length} record(s)</strong>
        </div>

        {feedback.length === 0 ? (
          <div className="admin-report-empty">
            <FaStar />
            <h3>No feedback submitted yet</h3>
            <p>
              Passenger feedback will appear here after users submit ratings and
              comments.
            </p>
          </div>
        ) : (
          <div className="admin-feedback-list">
            {feedback.map((item) => {
              const displayName = getFeedbackDisplayName(item);
              const displayEmail = getFeedbackDisplayEmail(item);

              return (
                <div className="admin-feedback-card" key={item.id}>
                  <div className="admin-feedback-top">
                    <div>
                      <h3>{displayName}</h3>
                      <p>{displayEmail}</p>
                    </div>

                    <div className="admin-feedback-actions">
                      <span
                        className={`admin-response-status ${
                          item.response_status === "Responded"
                            ? "admin-response-status-done"
                            : "admin-response-status-pending"
                        }`}
                      >
                        {item.response_status}
                      </span>

                      <button
                        className="admin-icon-btn danger"
                        onClick={() => handleDeleteFeedback(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="admin-feedback-stars">
                    {Array.from({ length: Number(item.rating) }).map(
                      (_, index) => (
                        <FaStar key={index} />
                      )
                    )}
                  </div>

                  {item.subject && (
                    <p className="admin-feedback-subject">
                      <strong>Subject:</strong> {item.subject}
                    </p>
                  )}

                  <p className="admin-feedback-message">{item.message}</p>

                  <small>
                    Submitted:{" "}
                    {new Date(item.created_at).toLocaleString("en-AU")}
                  </small>

                  {item.admin_response && (
                    <div className="admin-existing-response">
                      <strong>Admin Response:</strong>
                      <p>{item.admin_response}</p>
                      {item.responded_at && (
                        <small>
                          Responded:{" "}
                          {new Date(item.responded_at).toLocaleString("en-AU")}
                        </small>
                      )}
                    </div>
                  )}

                  <div className="admin-response-box">
                    <label>Write / Update Admin Response</label>
                    <textarea
                      value={responseText[item.id] || ""}
                      onChange={(event) =>
                        setResponseText((previous) => ({
                          ...previous,
                          [item.id]: event.target.value,
                        }))
                      }
                      placeholder="Write a response to this passenger..."
                      rows={4}
                    />

                    <button
                      className="admin-btn"
                      onClick={() => handleSaveResponse(item.id)}
                      disabled={savingResponseId === item.id}
                    >
                      <FaPaperPlane />
                      {savingResponseId === item.id
                        ? "Saving..."
                        : "Save Response"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}