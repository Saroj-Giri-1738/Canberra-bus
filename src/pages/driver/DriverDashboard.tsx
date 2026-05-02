import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
  FaTools,
} from "react-icons/fa";
import {
  getDriverAssignments,
  getDriverAttendance,
  markDriverAttendance,
  updateDriverAssignment,
  formatTime,
  type DriverAssignment,
  type AttendanceRecord,
} from "../../services/driverApi";

export default function DriverDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const driverName = storedUser?.full_name || storedUser?.fullName || "Driver";

  const [assignments, setAssignments] = useState<DriverAssignment[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const assignmentData = await getDriverAssignments();
      const attendanceData = await getDriverAttendance();

      setAssignments(assignmentData);
      setAttendance(attendanceData.today);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load driver dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const nextTrip =
    assignments.find((item) => item.assignment_status === "In Progress") ||
    assignments.find((item) => item.assignment_status === "Confirmed") ||
    assignments.find((item) => item.assignment_status === "Pending") ||
    assignments[0];

  const completedRoutes = assignments.filter(
    (item) => item.assignment_status === "Completed"
  );

  const activeRoutes = assignments.filter(
    (item) => item.assignment_status !== "Completed"
  );

  const inspectionsDone = assignments.filter(
    (item) => Number(item.inspection_done) === 1
  ).length;

  const dashboardStatus = useMemo(() => {
    if (!attendance) {
      return {
        title: "Attendance Required",
        message: "Mark your attendance before starting today’s route.",
        pill: "Action Needed",
      };
    }

    if (attendance.status === "Absent") {
      return {
        title: "Marked Absent",
        message: `Attendance recorded at ${new Date(
          attendance.marked_at
        ).toLocaleTimeString("en-AU", {
          hour: "2-digit",
          minute: "2-digit",
        })}.`,
        pill: "Unavailable",
      };
    }

    if (nextTrip?.assignment_status === "In Progress") {
      return {
        title: "Route In Progress",
        message: `${nextTrip.route_name} is currently active.`,
        pill: "Driving",
      };
    }

    return {
      title: "Ready for Duty",
      message: nextTrip
        ? `Next trip starts at ${formatTime(nextTrip.departure_time)}`
        : "No assigned trip remaining today.",
      pill: "On Schedule",
    };
  }, [attendance, nextTrip]);

  const stats = [
    {
      title: "Assigned Routes",
      value: String(assignments.length).padStart(2, "0"),
      icon: <FaRoute />,
    },
    {
      title: "Trips Today",
      value: String(activeRoutes.length).padStart(2, "0"),
      icon: <FaBusAlt />,
    },
    {
      title: "Attendance",
      value: attendance ? attendance.status : "Not Marked",
      icon: <FaUserCheck />,
    },
    {
      title: "Completed Runs",
      value: String(completedRoutes.length).padStart(2, "0"),
      icon: <FaClipboardCheck />,
    },
  ];

  const alerts = [
    !attendance && "Attendance is not marked for today.",
    nextTrip &&
      Number(nextTrip.inspection_done) === 0 &&
      `Pre-trip inspection pending for ${nextTrip.bus_number}.`,
    nextTrip &&
      `${nextTrip.route_name} departs at ${formatTime(
        nextTrip.departure_time
      )}.`,
    assignments.some((item) => item.assignment_status === "Pending") &&
      "You still have pending routes to confirm before departure.",
  ].filter(Boolean) as string[];

  const handleMarkPresent = async () => {
    try {
      await markDriverAttendance("Present");
      await loadDashboardData();
    } catch (error: any) {
      alert(error.message || "Failed to mark attendance");
    }
  };

  const handleStartRoute = async () => {
    if (!nextTrip) return;

    if (attendance?.status !== "Present") {
      alert("Please mark yourself present before starting a route.");
      return;
    }

    try {
      await updateDriverAssignment(nextTrip.assignment_id, {
        status: "In Progress",
        inspection_done: true,
      });

      await loadDashboardData();
    } catch (error: any) {
      alert(error.message || "Failed to start route");
    }
  };

  const handleCompleteRoute = async () => {
    if (!nextTrip) return;

    try {
      await updateDriverAssignment(nextTrip.assignment_id, {
        status: "Completed",
        inspection_done: true,
      });

      await loadDashboardData();
    } catch (error: any) {
      alert(error.message || "Failed to complete route");
    }
  };

  const handleVehicleCheck = async () => {
    if (!nextTrip) return;

    try {
      await updateDriverAssignment(nextTrip.assignment_id, {
        inspection_done: true,
      });

      await loadDashboardData();
    } catch (error: any) {
      alert(error.message || "Failed to update vehicle inspection");
    }
  };

  if (loading) {
    return (
      <div className="driver-dashboard">
        <div className="driver-panel">
          <h2>Loading driver dashboard...</h2>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="driver-dashboard">
        <div className="driver-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="driver-primary-btn" onClick={loadDashboardData}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="driver-dashboard">
      <section className="driver-dashboard-hero">
        <div>
          <p className="driver-eyebrow">Driver dashboard</p>
          <h1>Welcome back, {driverName}</h1>
          <p className="driver-dashboard-subtext">
            Manage assigned routes, attendance, vehicle checks, and daily trip
            progress using your MySQL backend.
          </p>

          {!attendance && (
            <button className="driver-hero-action" onClick={handleMarkPresent}>
              <FaUserCheck />
              Mark Present
            </button>
          )}
        </div>

        <div className="driver-hero-status-card">
          <span className="driver-status-label">Today’s Status</span>
          <h3>{dashboardStatus.title}</h3>
          <p>{dashboardStatus.message}</p>
          <span className="driver-status-pill">{dashboardStatus.pill}</span>
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

          {nextTrip ? (
            <div className="driver-next-trip-card">
              <div className="driver-trip-route-row">
                <div>
                  <span className="driver-trip-label">From</span>
                  <h3>{nextTrip.source}</h3>
                </div>

                <FaArrowRight className="driver-trip-arrow" />

                <div>
                  <span className="driver-trip-label">To</span>
                  <h3>{nextTrip.destination}</h3>
                </div>
              </div>

              <div className="driver-trip-meta-grid">
                <div className="driver-trip-meta-item">
                  <FaCalendarAlt />
                  <span>{nextTrip.assignment_date}</span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaClock />
                  <span>
                    {formatTime(nextTrip.departure_time)} -{" "}
                    {formatTime(nextTrip.arrival_time)}
                  </span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaBusAlt />
                  <span>Bus No. {nextTrip.bus_number}</span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaMapMarkedAlt />
                  <span>{nextTrip.plate_number || "No plate number"}</span>
                </div>
              </div>

              <div className="driver-trip-footer">
                <span className="driver-chip success">
                  {nextTrip.assignment_status}
                </span>

                {nextTrip.assignment_status === "In Progress" ? (
                  <button
                    className="driver-primary-btn"
                    onClick={handleCompleteRoute}
                  >
                    Complete Route
                  </button>
                ) : (
                  <button
                    className="driver-primary-btn"
                    onClick={handleStartRoute}
                    disabled={attendance?.status !== "Present"}
                  >
                    Start Route
                  </button>
                )}
              </div>

              {attendance?.status !== "Present" && (
                <p className="driver-action-note">
                  Mark yourself present before starting a route.
                </p>
              )}
            </div>
          ) : (
            <div className="driver-empty-state">
              No assigned trips remaining today.
            </div>
          )}
        </div>

        <div className="driver-panel">
          <div className="driver-panel-head">
            <div>
              <p className="driver-eyebrow">Notifications</p>
              <h2>Driver alerts</h2>
            </div>
          </div>

          <div className="driver-alert-list">
            {alerts.length === 0 ? (
              <div className="driver-empty-state">No active alerts right now.</div>
            ) : (
              alerts.map((alert, index) => (
                <div className="driver-alert-item" key={index}>
                  <FaExclamationCircle className="driver-alert-icon" />
                  <span>{alert}</span>
                </div>
              ))
            )}
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
            <Link to="/driver/routes" className="driver-quick-card">
              <FaRoute className="driver-quick-icon" />
              <h3>Assigned Routes</h3>
              <p>Check, start, and complete your assigned route list.</p>
            </Link>

            <Link to="/driver/attendance" className="driver-quick-card">
              <FaUserCheck className="driver-quick-icon" />
              <h3>Attendance</h3>
              <p>Mark your shift attendance and view today’s record.</p>
            </Link>

            <button
              className="driver-quick-card driver-quick-button"
              onClick={handleStartRoute}
            >
              <FaCheckCircle className="driver-quick-icon" />
              <h3>Start Trip</h3>
              <p>Begin your next confirmed route after attendance.</p>
            </button>

            <button
              className="driver-quick-card driver-quick-button"
              onClick={handleVehicleCheck}
            >
              <FaTools className="driver-quick-icon" />
              <h3>Vehicle Check</h3>
              <p>Mark the assigned bus inspection as completed.</p>
            </button>
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
              {attendance ? (
                <FaCheckCircle className="check-ok" />
              ) : (
                <FaExclamationCircle className="check-warn" />
              )}
              <span>
                {attendance
                  ? `Attendance marked ${attendance.status}`
                  : "Attendance not marked"}
              </span>
            </div>

            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>{assignments.length} route assignments loaded from MySQL</span>
            </div>

            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>
                {completedRoutes.length} of {assignments.length} routes
                completed
              </span>
            </div>

            <div className="driver-check-item">
              {inspectionsDone === assignments.length &&
              assignments.length > 0 ? (
                <FaCheckCircle className="check-ok" />
              ) : (
                <FaExclamationCircle className="check-warn" />
              )}
              <span>
                {inspectionsDone} of {assignments.length} vehicle inspections
                completed
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}