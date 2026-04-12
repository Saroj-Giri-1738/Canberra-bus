import "./DriverPages.css";

export default function AssignedRoutes() {
  const routes = [
    {
      name: "Canberra City → Belconnen",
      time: "08:30 AM",
      status: "Active",
    },
    {
      name: "ANU → Civic",
      time: "10:00 AM",
      status: "Pending",
    },
  ];

  return (
    <div className="driver-page">
      <div className="driver-hero">
        <div>
          <h1>Assigned Routes</h1>
          <p>View your daily assigned routes and schedules</p>
        </div>
      </div>

      <div className="driver-panel">
        {routes.map((route, index) => (
          <div key={index} className="route-card">
            <div className="route-title">{route.name}</div>
            <div className="route-meta">Departure: {route.time}</div>

            <span
              className={`status-pill ${
                route.status === "Active"
                  ? "status-active"
                  : "status-pending"
              }`}
            >
              {route.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}