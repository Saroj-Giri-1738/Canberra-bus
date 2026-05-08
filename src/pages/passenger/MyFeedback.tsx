import { useEffect, useMemo, useState } from "react";
import "./PassengerPages.css";
import {
  FaCommentDots,
  FaReply,
  FaStar,
  FaSyncAlt,
  FaClock,
} from "react-icons/fa";
import {
  getMyFeedback,
  type PassengerFeedback,
} from "../../services/passengerApi";

export default function MyFeedback() {
  const [feedback, setFeedback] = useState<PassengerFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadFeedback = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getMyFeedback();
      setFeedback(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const summary = useMemo(() => {
    return {
      total: feedback.length,
      pending: feedback.filter((item) => item.response_status === "Pending")
        .length,
      responded: feedback.filter((item) => item.response_status === "Responded")
        .length,
    };
  }, [feedback]);

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="passenger-page">
        <section className="passenger-panel">
          <h2>Loading feedback...</h2>
        </section>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="passenger-page">
        <section className="passenger-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="passenger-btn" onClick={loadFeedback}>
            Try Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="passenger-page">
      <section className="passenger-hero">
        <div>
          <span className="passenger-badge">Passenger Services</span>
          <h1>My Feedback</h1>
          <p>
            View your submitted feedback and check whether admin has responded.
          </p>
        </div>

        <button className="passenger-btn light" onClick={loadFeedback}>
          <FaSyncAlt />
          Refresh
        </button>
      </section>

      <section className="passenger-feedback-summary">
        <div className="passenger-feedback-summary-card">
          <FaCommentDots />
          <div>
            <h3>{summary.total}</h3>
            <p>Total Feedback</p>
          </div>
        </div>

        <div className="passenger-feedback-summary-card">
          <FaClock />
          <div>
            <h3>{summary.pending}</h3>
            <p>Pending Response</p>
          </div>
        </div>

        <div className="passenger-feedback-summary-card">
          <FaReply />
          <div>
            <h3>{summary.responded}</h3>
            <p>Admin Responded</p>
          </div>
        </div>
      </section>

      <section className="passenger-panel">
        <div className="passenger-panel-head">
          <div>
            <span className="passenger-badge">MySQL Data</span>
            <h2>Feedback History</h2>
          </div>

          <strong>{feedback.length} record(s)</strong>
        </div>

        {feedback.length === 0 ? (
          <div className="passenger-empty-state">
            <FaCommentDots />
            <h3>No feedback submitted yet</h3>
            <p>
              Submit feedback first, then admin responses will appear here.
            </p>
          </div>
        ) : (
          <div className="passenger-feedback-list">
            {feedback.map((item) => (
              <div className="passenger-feedback-card" key={item.id}>
                <div className="passenger-feedback-top">
                  <div>
                    <h3>{item.subject || "General Feedback"}</h3>
                    <p>Submitted: {formatDateTime(item.created_at)}</p>
                  </div>

                  <span
                    className={`passenger-feedback-status ${
                      item.response_status === "Responded"
                        ? "passenger-feedback-status-done"
                        : "passenger-feedback-status-pending"
                    }`}
                  >
                    {item.response_status}
                  </span>
                </div>

                <div className="passenger-feedback-stars">
                  {Array.from({ length: Number(item.rating) }).map(
                    (_, index) => (
                      <FaStar key={index} />
                    )
                  )}
                </div>

                <div className="passenger-feedback-message-box">
                  <strong>Your Message:</strong>
                  <p>{item.message}</p>
                </div>

                {item.admin_response ? (
                  <div className="passenger-admin-response-box">
                    <strong>Admin Response:</strong>
                    <p>{item.admin_response}</p>

                    {item.responded_at && (
                      <small>
                        Responded: {formatDateTime(item.responded_at)}
                      </small>
                    )}
                  </div>
                ) : (
                  <div className="passenger-pending-response-box">
                    <strong>Admin Response:</strong>
                    <p>No response yet. Please check again later.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}