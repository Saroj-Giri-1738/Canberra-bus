import { useEffect, useMemo, useState } from "react";
import "./PassengerPages.css";
import {
  FaBusAlt,
  FaClock,
  FaMapMarkedAlt,
  FaSearch,
  FaSyncAlt,
  FaTicketAlt,
} from "react-icons/fa";
import {
  formatTime,
  getPassengerRoutes,
  type PassengerRoute,
} from "../../services/passengerApi";

export default function BusSchedule() {
  const [routes, setRoutes] = useState<PassengerRoute[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<PassengerRoute | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRoutes = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getPassengerRoutes();
      setRoutes(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load bus schedule");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const filteredRoutes = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return routes.filter((route) => {
      return (
        route.route_name.toLowerCase().includes(search) ||
        route.source.toLowerCase().includes(search) ||
        route.destination.toLowerCase().includes(search) ||
        route.stops.some((stop) => stop.toLowerCase().includes(search))
      );
    });
  }, [routes, searchTerm]);

  if (loading) {
    return (
      <div className="passenger-page">
        <section className="passenger-panel">
          <h2>Loading bus schedule...</h2>
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
          <button className="passenger-btn" onClick={loadRoutes}>
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
          <h1>Bus Schedule</h1>
          <p>
            View active Canberra Bus routes, departure times, fares, and stop
            lists directly from the MySQL routes table.
          </p>
        </div>

        <button className="passenger-btn light" onClick={loadRoutes}>
          <FaSyncAlt />
          Refresh Schedule
        </button>
      </section>

      <section className="passenger-panel">
        <div className="passenger-panel-head">
          <div>
            <span className="passenger-badge">MySQL Data</span>
            <h2>Available Routes</h2>
          </div>

          <strong>{filteredRoutes.length} route(s)</strong>
        </div>

        <div className="passenger-filter-bar">
          <div className="passenger-search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by route, source, destination, or stop"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        {filteredRoutes.length === 0 ? (
          <div className="passenger-empty-state">
            <FaBusAlt />
            <h3>No routes found</h3>
            <p>Try searching another route, stop, source, or destination.</p>
          </div>
        ) : (
          <div className="passenger-route-list">
            {filteredRoutes.map((route) => (
              <div className="passenger-route-card" key={route.id}>
                <div className="passenger-route-top">
                  <div>
                    <h3>{route.route_name}</h3>
                    <p>
                      {route.source} → {route.destination}
                    </p>
                  </div>

                  <span className="passenger-status passenger-status-booked">
                    {route.status}
                  </span>
                </div>

                <div className="passenger-route-meta">
                  <span>
                    <FaClock />
                    {formatTime(route.departure_time)} -{" "}
                    {formatTime(route.arrival_time)}
                  </span>

                  <span>
                    <FaTicketAlt />${Number(route.fare).toFixed(2)}
                  </span>

                  <span>
                    <FaMapMarkedAlt />
                    {route.stops.length} stop(s)
                  </span>
                </div>

                <div className="passenger-route-actions">
                  <button
                    className="passenger-btn secondary"
                    onClick={() => setSelectedRoute(route)}
                  >
                    View Stops
                  </button>

                  <a className="passenger-btn" href="/passenger/book">
                    <FaTicketAlt />
                    Book Ticket
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {selectedRoute && (
        <div
          className="passenger-modal-backdrop"
          onClick={() => setSelectedRoute(null)}
        >
          <div
            className="passenger-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="passenger-modal-head">
              <div>
                <span className="passenger-badge">Route Stops</span>
                <h2>{selectedRoute.route_name}</h2>
              </div>

              <button
                className="passenger-modal-close"
                onClick={() => setSelectedRoute(null)}
              >
                ×
              </button>
            </div>

            <ol className="passenger-stop-list">
              {selectedRoute.stops.length > 0 ? (
                selectedRoute.stops.map((stop) => <li key={stop}>{stop}</li>)
              ) : (
                <li>No stops available for this route.</li>
              )}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}