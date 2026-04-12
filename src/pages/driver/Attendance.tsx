import "./DriverPages.css";
import { useState } from "react";
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaClock,
  FaClipboardCheck,
} from "react-icons/fa";

export default function Attendance() {
  const [status, setStatus] = useState("");

  return (
    <div className="driver-page">
      <section className="driver-page-hero">
        <div>
          <span className="driver-page-badge">Driver Services</span>
          <h1>Attendance</h1>
          <p>
            Mark your attendance, view your shift status, and stay ready for
            your daily transport duties.
          </p>
        </div>
      </section>

      <div className="driver-page-grid">
        <div className="driver-page-panel">
          <h2>Mark Today’s Attendance</h2>
          <p>Please confirm your availability before starting your shift.</p>

          <div className="driver-attendance-box">
            <button
              className="driver-page-btn present"
              onClick={() => setStatus("Present")}
            >
              <FaUserCheck />
              Mark Present
            </button>

            <button
              className="driver-page-btn absent"
              onClick={() => setStatus("Absent")}
            >
              <FaUserTimes />
              Mark Absent
            </button>
          </div>

          {status && (
            <div className="driver-attendance-result">
              <strong>Current Status:</strong> {status}
            </div>
          )}
        </div>

        <div className="driver-page-panel">
          <div className="driver-info-card">
            <h3>Shift Summary</h3>

            <div className="driver-info-list">
              <div className="driver-info-item">
                <FaCalendarAlt />
                <span>06 Apr 2026</span>
              </div>

              <div className="driver-info-item">
                <FaClock />
                <span>Shift starts at 08:00 AM</span>
              </div>

              <div className="driver-info-item">
                <FaClipboardCheck />
                <span>2 assigned trips today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}