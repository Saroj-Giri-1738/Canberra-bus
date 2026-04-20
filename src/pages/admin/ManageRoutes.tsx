import { useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaRoute,
  FaMapMarkedAlt,
  FaClock,
  FaSearch,
  FaTimes,
  FaSave,
  FaBusAlt,
} from "react-icons/fa";

type RouteItem = {
  id: number;
  routeName: string;
  source: string;
  destination: string;
  stops: number;
  time: string;
  status: "Active" | "Pending";
};

export default function ManageRoutes() {
  const [routes, setRoutes] = useState<RouteItem[]>([
    {
      id: 1,
      routeName: "Canberra City → Belconnen",
      source: "Canberra City",
      destination: "Belconnen",
      stops: 8,
      time: "08:30 AM",
      status: "Active",
    },
    {
      id: 2,
      routeName: "ANU → Civic",
      source: "ANU",
      destination: "Civic",
      stops: 5,
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 3,
      routeName: "Woden → Airport",
      source: "Woden",
      destination: "Airport",
      stops: 6,
      time: "11:20 AM",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedRoute, setSelectedRoute] = useState<RouteItem | null>(null);
  const [editRoute, setEditRoute] = useState<RouteItem | null>(null);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const matchesSearch =
        route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.destination.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : route.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [routes, searchTerm, statusFilter]);

  const handleEditChange = (
    field: keyof RouteItem,
    value: string | number
  ) => {
    if (!editRoute) return;
    setEditRoute({ ...editRoute, [field]: value } as RouteItem);
  };

  const handleSaveRoute = () => {
    if (!editRoute) return;

    const updatedRoutes = routes.map((route) =>
      route.id === editRoute.id ? editRoute : route
    );

    setRoutes(updatedRoutes);
    setEditRoute(null);
  };

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Routes</h1>
          <p>Monitor route planning, departure times, and stop information.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <div className="admin-filter-bar">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by route, source, or destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-role-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <h2>Route Management</h2>
        <p>Review and update all current route details.</p>

        <div className="admin-record-list">
          {filteredRoutes.length === 0 ? (
            <div className="admin-empty-state">No routes found for this filter.</div>
          ) : (
            filteredRoutes.map((route) => (
              <div className="admin-record-card" key={route.id}>
                <div className="admin-record-top">
                  <h3>{route.routeName}</h3>
                  <span
                    className={`admin-status-pill ${
                      route.status === "Active"
                        ? "admin-status-active"
                        : "admin-status-warning"
                    }`}
                  >
                    {route.status}
                  </span>
                </div>

                <div className="admin-record-meta">
                  <span>
                    <FaMapMarkedAlt /> {route.stops} stops
                  </span>
                  <span>
                    <FaClock /> {route.time}
                  </span>
                  <span>
                    <FaRoute /> {route.source} → {route.destination}
                  </span>
                </div>

                <div className="admin-action-row">
                  <button
                    className="admin-page-btn"
                    onClick={() => setEditRoute(route)}
                  >
                    Edit Route
                  </button>
                  <button
                    className="admin-page-btn secondary"
                    onClick={() => setSelectedRoute(route)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedRoute && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedRoute(null)}
        >
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Route Details</h2>
              <button
                className="admin-close-btn"
                onClick={() => setSelectedRoute(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <strong>Route Name</strong>
                <span>{selectedRoute.routeName}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Status</strong>
                <span>{selectedRoute.status}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Source</strong>
                <span>{selectedRoute.source}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Destination</strong>
                <span>{selectedRoute.destination}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Stops</strong>
                <span>{selectedRoute.stops}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Departure Time</strong>
                <span>{selectedRoute.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {editRoute && (
        <div className="admin-modal-overlay" onClick={() => setEditRoute(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Edit Route</h2>
              <button
                className="admin-close-btn"
                onClick={() => setEditRoute(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-edit-form">
              <label>Route Name</label>
              <input
                type="text"
                value={editRoute.routeName}
                onChange={(e) =>
                  handleEditChange("routeName", e.target.value)
                }
              />

              <label>Source</label>
              <input
                type="text"
                value={editRoute.source}
                onChange={(e) => handleEditChange("source", e.target.value)}
              />

              <label>Destination</label>
              <input
                type="text"
                value={editRoute.destination}
                onChange={(e) =>
                  handleEditChange("destination", e.target.value)
                }
              />

              <label>Stops</label>
              <input
                type="number"
                value={editRoute.stops}
                onChange={(e) =>
                  handleEditChange("stops", Number(e.target.value))
                }
              />

              <label>Departure Time</label>
              <input
                type="text"
                value={editRoute.time}
                onChange={(e) => handleEditChange("time", e.target.value)}
              />

              <label>Status</label>
              <select
                value={editRoute.status}
                onChange={(e) =>
                  handleEditChange("status", e.target.value as RouteItem["status"])
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>

              <button className="admin-page-btn" onClick={handleSaveRoute}>
                <FaSave />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}