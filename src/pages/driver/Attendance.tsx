import "./DriverPages.css";
import { useMemo, useState } from "react";
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaClock,
  FaClipboardCheck,
  FaHistory,
} from "react-icons/fa";
import {
  formatToday,
  getAttendanceHistory,
  getDriverRoutes,
  getTodayAttendance,
  markTodayAttendance,
  type AttendanceStatus,
  type DriverAttendance,
} from "../../data/driverData";

export default function Attendance() {
  const [todayAttendance, setTodayAttendance] = useState(getTodayAttendance());
  const [history, setHistory] = useState<DriverAttendance[]>(
    getAttendanceHistory()
  );

  const routes = getDriverRoutes();

  const nextRoute = routes.find((route) => route.status !== "Completed");

  const completedRoutes = routes.filter(
    (route) => route.status === "Completed"
  ).length;

  const attendanceSummary = useMemo(() => {
    const presentDays = history.filter(
      (item) => item.status === "Present"
    ).length;

    const absentDays = history.filter(
      (item) => item.status === "Absent"
    ).length;

    return { presentDays, absentDays };
  }, [history]);

  const handleMarkAttendance = (status: AttendanceStatus) => {
    const updatedAttendance = markTodayAttendance(status);

    setTodayAttendance(updatedAttendance);
    setHistory(getAttendanceHistory());
  };

  return (
    <div className="driver-page">
      <section className="driver-page-hero">
        <div>
          <span className="driver-page-badge">Driver Services</span>
          <h1>Attendance</h1>
          <p>
            Mark today’s shift attendance, track your current status, and view
            recent attendance history.
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
              onClick={() => handleMarkAttendance("Present")}
            >
              <FaUserCheck />
              Mark Present
            </button>

            <button
              className="driver-page-btn absent"
              onClick={() => handleMarkAttendance("Absent")}
            >
              <FaUserTimes />
              Mark Absent
            </button>
          </div>

          {todayAttendance ? (
            <div className="driver-attendance-result">
              <strong>Current Status:</strong> {todayAttendance.status}
              <br />
              <span>
                Marked at {todayAttendance.markedAt} on {formatToday()}
              </span>
            </div>
          ) : (
            <div className="driver-attendance-warning">
              Attendance has not been marked today.
            </div>
          )}

          <div className="driver-attendance-summary-grid">
            <div className="driver-summary-tile">
              <strong>{attendanceSummary.presentDays}</strong>
              <span>Present Records</span>
            </div>

            <div className="driver-summary-tile">
              <strong>{attendanceSummary.absentDays}</strong>
              <span>Absent Records</span>
            </div>
          </div>
        </div>

        <div className="driver-page-panel">
          <div className="driver-info-card">
            <h3>Shift Summary</h3>

            <div className="driver-info-list">
              <div className="driver-info-item">
                <FaCalendarAlt />
                <span>{formatToday()}</span>
              </div>

              <div className="driver-info-item">
                <FaClock />
                <span>
                  Next shift route:{" "}
                  {nextRoute
                    ? `${nextRoute.departureTime} - ${nextRoute.routeName}`
                    : "No pending route"}
                </span>
              </div>

              <div className="driver-info-item">
                <FaClipboardCheck />
                <span>
                  {completedRoutes} of {routes.length} trips completed today
                </span>
              </div>
            </div>
          </div>

          <div className="driver-history-card">
            <h3>
              <FaHistory />
              Recent Attendance
            </h3>

            {history.length === 0 ? (
              <p>No attendance records yet.</p>
            ) : (
              <div className="driver-history-list">
                {history.slice(0, 5).map((item) => (
                  <div className="driver-history-item" key={item.date}>
                    <span>{item.date}</span>
                    <strong>{item.status}</strong>
                    <small>{item.markedAt}</small>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}