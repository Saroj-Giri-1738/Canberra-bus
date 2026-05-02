import "./DriverPages.css";
import { useEffect, useMemo, useState } from "react";
import {
  FaUserCheck,
  FaUserTimes,
  FaCalendarAlt,
  FaClock,
  FaClipboardCheck,
  FaHistory,
} from "react-icons/fa";
import {
  getDriverAttendance,
  getDriverAssignments,
  markDriverAttendance,
  formatTime,
  type AttendanceRecord,
  type DriverAssignment,
} from "../../services/driverApi";

export default function Attendance() {
  const [todayAttendance, setTodayAttendance] =
    useState<AttendanceRecord | null>(null);
  const [history, setHistory] = useState<AttendanceRecord[]>([]);
  const [assignments, setAssignments] = useState<DriverAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const attendanceData = await getDriverAttendance();
      const assignmentData = await getDriverAssignments();

      setTodayAttendance(attendanceData.today);
      setHistory(attendanceData.history);
      setAssignments(assignmentData);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttendanceData();
  }, []);

  const nextRoute = assignments.find(
    (route) => route.assignment_status !== "Completed"
  );

  const completedRoutes = assignments.filter(
    (route) => route.assignment_status === "Completed"
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

  const handleMarkAttendance = async (status: "Present" | "Absent") => {
    try {
      await markDriverAttendance(status);
      await loadAttendanceData();
    } catch (error: any) {
      alert(error.message || "Failed to mark attendance");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatMarkedTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="driver-page">
        <section className="driver-page-panel">
          <h2>Loading attendance...</h2>
        </section>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="driver-page">
        <section className="driver-page-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="driver-page-btn" onClick={loadAttendanceData}>
            Try Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="driver-page">
      <section className="driver-page-hero">
        <div>
          <span className="driver-page-badge">Driver Services</span>
          <h1>Attendance</h1>
          <p>
            Mark today’s shift attendance, track your current status, and view
            recent attendance history from MySQL.
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
                Marked at {formatMarkedTime(todayAttendance.marked_at)} on{" "}
                {formatDate(todayAttendance.attendance_date)}
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
                <span>
                  {new Date().toLocaleDateString("en-AU", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="driver-info-item">
                <FaClock />
                <span>
                  Next shift route:{" "}
                  {nextRoute
                    ? `${formatTime(nextRoute.departure_time)} - ${
                        nextRoute.route_name
                      }`
                    : "No pending route"}
                </span>
              </div>

              <div className="driver-info-item">
                <FaClipboardCheck />
                <span>
                  {completedRoutes} of {assignments.length} trips completed
                  today
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
                  <div className="driver-history-item" key={item.id}>
                    <span>{formatDate(item.attendance_date)}</span>
                    <strong>{item.status}</strong>
                    <small>{formatMarkedTime(item.marked_at)}</small>
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