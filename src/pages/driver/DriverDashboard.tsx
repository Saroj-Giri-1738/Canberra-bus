import { useMemo, useState } from "react";
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
  formatToday,
  getDriverRoutes,
  getTodayAttendance,
  markTodayAttendance,
  updateDriverRoute,
  type DriverRoute,
} from "../../data/driverData";

export default function DriverDashboard() {
  const driverName =
    JSON.parse(localStorage.getItem("user") || "{}")?.fullName || "Driver";

  const [routes, setRoutes] = useState<DriverRoute[]>(getDriverRoutes());
  const [attendance, setAttendance] = useState(getTodayAttendance());

  const nextTrip =
    routes.find((route) => route.status === "In Progress") ||
    routes.find((route) => route.status === "Confirmed") ||
    routes.find((route) => route.status === "Pending") ||
    routes[0];

  const completedRoutes = routes.filter(
    (route) => route.status === "Completed"
  );

  const activeRoutes = routes.filter((route) => route.status !== "Completed");

  const inspectionsDone = routes.filter((route) => route.inspectionDone).length;

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
        message: `Attendance recorded at ${attendance.markedAt}.`,
        pill: "Unavailable",
      };
    }

    if (nextTrip?.status === "In Progress") {
      return {
        title: "Route In Progress",
        message: `${nextTrip.routeName} is currently active.`,
        pill: "Driving",
      };
    }

    return {
      title: "Ready for Duty",
      message: `Attendance recorded at ${
        attendance.markedAt
      } • Next trip starts at ${nextTrip?.departureTime || "N/A"}`,
      pill: "On Schedule",
    };
  }, [attendance, nextTrip]);

  const stats = [
    {
      title: "Assigned Routes",
      value: String(routes.length).padStart(2, "0"),
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
      !nextTrip.inspectionDone &&
      `Pre-trip inspection pending for ${nextTrip.busNumber}.`,
    nextTrip &&
      `${nextTrip.routeName} departs at ${nextTrip.departureTime} from ${nextTrip.platform}.`,
    routes.some((route) => route.status === "Pending") &&
      "You still have pending routes to confirm before departure.",
  ].filter(Boolean) as string[];

  const handleAttendance = () => {
    const updatedAttendance = markTodayAttendance("Present");
    setAttendance(updatedAttendance);
  };

  const handleStartRoute = () => {
    if (!nextTrip || attendance?.status !== "Present") return;

    const updatedRoutes = updateDriverRoute(nextTrip.id, {
      status: "In Progress",
      inspectionDone: true,
    });

    setRoutes(updatedRoutes);
  };

  const handleCompleteRoute = () => {
    if (!nextTrip) return;

    const updatedRoutes = updateDriverRoute(nextTrip.id, {
      status: "Completed",
      inspectionDone: true,
    });

    setRoutes(updatedRoutes);
  };

  return (
    <div className="driver-dashboard">
      <section className="driver-dashboard-hero">
        <div>
          <p className="driver-eyebrow">Driver dashboard</p>
          <h1>Welcome back, {driverName}</h1>
          <p className="driver-dashboard-subtext">
            Manage assigned routes, attendance, vehicle checks, and daily trip
            progress from one functional dashboard.
          </p>

          {!attendance && (
            <button className="driver-hero-action" onClick={handleAttendance}>
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
                  <span>{formatToday()}</span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaClock />
                  <span>
                    {nextTrip.departureTime} - {nextTrip.arrivalTime}
                  </span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaBusAlt />
                  <span>Bus No. {nextTrip.busNumber}</span>
                </div>

                <div className="driver-trip-meta-item">
                  <FaMapMarkedAlt />
                  <span>{nextTrip.platform}</span>
                </div>
              </div>

              <div className="driver-trip-footer">
                <span className="driver-chip success">{nextTrip.status}</span>

                {nextTrip.status === "In Progress" ? (
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
              <p>Check, start, complete, and reset your route list.</p>
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
              onClick={() =>
                nextTrip &&
                setRoutes(
                  updateDriverRoute(nextTrip.id, { inspectionDone: true })
                )
              }
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
              <span>{routes.length} route assignments loaded</span>
            </div>

            <div className="driver-check-item">
              <FaCheckCircle className="check-ok" />
              <span>
                {completedRoutes.length} of {routes.length} routes completed
              </span>
            </div>

            <div className="driver-check-item">
              {inspectionsDone === routes.length ? (
                <FaCheckCircle className="check-ok" />
              ) : (
                <FaExclamationCircle className="check-warn" />
              )}
              <span>
                {inspectionsDone} of {routes.length} vehicle inspections
                completed
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}