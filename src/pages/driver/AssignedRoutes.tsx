import { useEffect, useMemo, useState } from "react";
import "./DriverPages.css";
import {
  FaBusAlt,
  FaClock,
  FaMapMarkedAlt,
  FaPlay,
  FaCheckCircle,
  FaUndo,
  FaSearch,
  FaRoute,
} from "react-icons/fa";
import {
  getDriverAssignments,
  updateDriverAssignment,
  formatTime,
  type DriverAssignment,
} from "../../services/driverApi";

export default function AssignedRoutes() {
  const [assignments, setAssignments] = useState<DriverAssignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedRoute, setSelectedRoute] = useState<DriverAssignment | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getDriverAssignments();
      setAssignments(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load assigned routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        assignment.route_name.toLowerCase().includes(search) ||
        assignment.bus_number.toLowerCase().includes(search) ||
        assignment.source.toLowerCase().includes(search) ||
        assignment.destination.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || assignment.assignment_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchTerm, statusFilter]);

  const updateStatus = async (
    assignmentId: number,
    status: DriverAssignment["assignment_status"]
  ) => {
    try {
      await updateDriverAssignment(assignmentId, {
        status,
        inspection_done:
          status === "In Progress" || status === "Completed" ? true : undefined,
      });

      await loadAssignments();
    } catch (error: any) {
      alert(error.message || "Failed to update route status");
    }
  };

  const toggleInspection = async (assignment: DriverAssignment) => {
    try {
      await updateDriverAssignment(assignment.assignment_id, {
        inspection_done: Number(assignment.inspection_done) === 0,
      });

      await loadAssignments();
    } catch (error: any) {
      alert(error.message || "Failed to update inspection");
    }
  };

  if (loading) {
    return (
      <div className="driver-page">
        <section className="driver-page-panel">
          <h2>Loading assigned routes...</h2>
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
          <button className="driver-page-btn" onClick={loadAssignments}>
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
          <h1>Assigned Routes</h1>
          <p>
            View today’s assigned routes from MySQL, update trip status,
            complete inspections, and review stop lists.
          </p>
        </div>

        <button className="driver-page-btn light" onClick={loadAssignments}>
          <FaUndo />
          Refresh Routes
        </button>
      </section>

      <section className="driver-page-panel">
        <div className="driver-filter-bar">
          <div className="driver-search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by route, bus, source, or destination"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            className="driver-filter-select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="driver-route-list">
          {filteredAssignments.length === 0 ? (
            <div className="driver-empty-state">
              No assigned routes found for this driver.
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <div key={assignment.assignment_id} className="driver-route-card">
                <div className="driver-route-top">
                  <div>
                    <h3>{assignment.route_name}</h3>
                    <p>
                      {assignment.source} to {assignment.destination} •{" "}
                      {assignment.stops?.length || 0} stops
                    </p>
                  </div>

                  <span
                    className={`driver-status-pill ${
                      assignment.assignment_status === "Completed"
                        ? "driver-status-active"
                        : assignment.assignment_status === "In Progress"
                        ? "driver-status-progress"
                        : assignment.assignment_status === "Pending"
                        ? "driver-status-pending"
                        : "driver-status-confirmed"
                    }`}
                  >
                    {assignment.assignment_status}
                  </span>
                </div>

                <div className="driver-route-meta">
                  <span>
                    <FaClock /> {formatTime(assignment.departure_time)} -{" "}
                    {formatTime(assignment.arrival_time)}
                  </span>

                  <span>
                    <FaBusAlt /> Bus {assignment.bus_number}
                  </span>

                  <span>
                    <FaMapMarkedAlt />{" "}
                    {assignment.plate_number || "No plate number"}
                  </span>

                  <span>
                    <FaRoute /> Inspection:{" "}
                    {Number(assignment.inspection_done) === 1
                      ? "Done"
                      : "Pending"}
                  </span>
                </div>

                <div className="driver-action-row">
                  {assignment.assignment_status !== "In Progress" &&
                    assignment.assignment_status !== "Completed" && (
                      <button
                        className="driver-page-btn"
                        onClick={() =>
                          updateStatus(
                            assignment.assignment_id,
                            "In Progress"
                          )
                        }
                      >
                        <FaPlay />
                        Start
                      </button>
                    )}

                  {assignment.assignment_status === "In Progress" && (
                    <button
                      className="driver-page-btn present"
                      onClick={() =>
                        updateStatus(assignment.assignment_id, "Completed")
                      }
                    >
                      <FaCheckCircle />
                      Complete
                    </button>
                  )}

                  {assignment.assignment_status === "Completed" && (
                    <button
                      className="driver-page-btn"
                      onClick={() =>
                        updateStatus(assignment.assignment_id, "Confirmed")
                      }
                    >
                      Reopen
                    </button>
                  )}

                  <button
                    className="driver-page-btn secondary"
                    onClick={() => toggleInspection(assignment)}
                  >
                    {Number(assignment.inspection_done) === 1
                      ? "Undo Inspection"
                      : "Mark Inspection"}
                  </button>

                  <button
                    className="driver-page-btn secondary"
                    onClick={() => setSelectedRoute(assignment)}
                  >
                    View Stops
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedRoute && (
        <div
          className="driver-modal-backdrop"
          onClick={() => setSelectedRoute(null)}
        >
          <div
            className="driver-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="driver-modal-head">
              <div>
                <p className="driver-page-badge">Stop List</p>
                <h2>{selectedRoute.route_name}</h2>
              </div>

              <button
                className="driver-modal-close"
                onClick={() => setSelectedRoute(null)}
              >
                ×
              </button>
            </div>

            <ol className="driver-stop-list">
              {selectedRoute.stops && selectedRoute.stops.length > 0 ? (
                selectedRoute.stops.map((stop) => <li key={stop}>{stop}</li>)
              ) : (
                <li>No stops found for this route.</li>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}