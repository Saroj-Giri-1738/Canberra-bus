import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./PassengerDashboard.css";
import {
  FaBusAlt,
  FaCalendarAlt,
  FaClock,
  FaMapMarkedAlt,
  FaRoute,
  FaSyncAlt,
  FaTicketAlt,
  FaWallet,
} from "react-icons/fa";
import {
  formatDate,
  formatTime,
  getPassengerBookings,
  getPassengerRoutes,
  type PassengerBooking,
  type PassengerRoute,
} from "../../services/passengerApi";

export default function PassengerDashboard() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const passengerName =
    storedUser?.full_name || storedUser?.fullName || "Passenger";

  const [routes, setRoutes] = useState<PassengerRoute[]>([]);
  const [bookings, setBookings] = useState<PassengerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const routeData = await getPassengerRoutes();
      const bookingData = await getPassengerBookings();

      setRoutes(routeData);
      setBookings(bookingData);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load passenger dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const activeBookings = bookings.filter(
    (booking) => booking.booking_status === "Booked"
  );

  const cancelledBookings = bookings.filter(
    (booking) => booking.booking_status === "Cancelled"
  );

  const totalSpent = bookings
    .filter((booking) => booking.booking_status !== "Cancelled")
    .reduce((sum, booking) => sum + Number(booking.total_amount), 0);

  const upcomingBooking = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);

    return (
      bookings
        .filter(
          (booking) =>
            booking.booking_status === "Booked" &&
            booking.travel_date >= today
        )
        .sort((a, b) => a.travel_date.localeCompare(b.travel_date))[0] || null
    );
  }, [bookings]);

  const nextRoute = routes[0] || null;

  const dashboardCards = [
    {
      title: "Available Routes",
      value: routes.length,
      icon: <FaRoute />,
    },
    {
      title: "My Bookings",
      value: bookings.length,
      icon: <FaTicketAlt />,
    },
    {
      title: "Active Tickets",
      value: activeBookings.length,
      icon: <FaBusAlt />,
    },
    {
      title: "Total Spent",
      value: `$${totalSpent.toFixed(2)}`,
      icon: <FaWallet />,
    },
  ];

  if (loading) {
    return (
      <div className="passenger-dashboard">
        <section className="passenger-dashboard-panel">
          <h2>Loading passenger dashboard...</h2>
        </section>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="passenger-dashboard">
        <section className="passenger-dashboard-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="passenger-dashboard-btn" onClick={loadDashboardData}>
            Try Again
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="passenger-dashboard">
      <section className="passenger-dashboard-hero">
        <div>
          <span className="passenger-dashboard-badge">Passenger Dashboard</span>
          <h1>Welcome back, {passengerName}</h1>
          <p>
            Book tickets, view available routes, check your bookings, and manage
            your travel using data from the MySQL backend.
          </p>
        </div>

        <button className="passenger-dashboard-btn light" onClick={loadDashboardData}>
          <FaSyncAlt />
          Refresh
        </button>
      </section>

      <section className="passenger-dashboard-stats">
        {dashboardCards.map((card) => (
          <div className="passenger-dashboard-card" key={card.title}>
            <div className="passenger-dashboard-icon">{card.icon}</div>
            <div>
              <h3>{card.value}</h3>
              <p>{card.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="passenger-dashboard-grid">
        <div className="passenger-dashboard-panel">
          <div className="passenger-dashboard-panel-head">
            <div>
              <span className="passenger-dashboard-badge">Upcoming Travel</span>
              <h2>Next Booking</h2>
            </div>
          </div>

          {upcomingBooking ? (
            <div className="passenger-dashboard-trip-card">
              <h3>{upcomingBooking.route_name}</h3>
              <p>
                {upcomingBooking.source} → {upcomingBooking.destination}
              </p>

              <div className="passenger-dashboard-info-list">
                <span>
                  <FaCalendarAlt />
                  Travel Date: {formatDate(upcomingBooking.travel_date)}
                </span>

                <span>
                  <FaClock />
                  {formatTime(upcomingBooking.departure_time)} -{" "}
                  {formatTime(upcomingBooking.arrival_time)}
                </span>

                <span>
                  <FaTicketAlt />
                  {upcomingBooking.seats} seat(s)
                </span>

                <span>
                  <FaWallet />${Number(upcomingBooking.total_amount).toFixed(2)}
                </span>
              </div>

              <Link to="/passenger/bookings" className="passenger-dashboard-btn">
                View My Bookings
              </Link>
            </div>
          ) : (
            <div className="passenger-dashboard-empty">
              <FaTicketAlt />
              <h3>No upcoming booking</h3>
              <p>Book a ticket to see your next trip here.</p>
              <Link to="/passenger/book" className="passenger-dashboard-btn">
                Book Ticket
              </Link>
            </div>
          )}
        </div>

        <div className="passenger-dashboard-panel">
          <div className="passenger-dashboard-panel-head">
            <div>
              <span className="passenger-dashboard-badge">Route Info</span>
              <h2>Next Available Route</h2>
            </div>
          </div>

          {nextRoute ? (
            <div className="passenger-dashboard-trip-card">
              <h3>{nextRoute.route_name}</h3>
              <p>
                {nextRoute.source} → {nextRoute.destination}
              </p>

              <div className="passenger-dashboard-info-list">
                <span>
                  <FaClock />
                  {formatTime(nextRoute.departure_time)} -{" "}
                  {formatTime(nextRoute.arrival_time)}
                </span>

                <span>
                  <FaWallet />${Number(nextRoute.fare).toFixed(2)}
                </span>

                <span>
                  <FaMapMarkedAlt />
                  {nextRoute.stops.length} stop(s)
                </span>

                <span>
                  <FaBusAlt />
                  Status: {nextRoute.status}
                </span>
              </div>

              <Link to="/passenger/schedule" className="passenger-dashboard-btn">
                View Schedule
              </Link>
            </div>
          ) : (
            <div className="passenger-dashboard-empty">
              <FaRoute />
              <h3>No active routes</h3>
              <p>There are no active routes available right now.</p>
            </div>
          )}
        </div>
      </section>

      <section className="passenger-dashboard-grid">
        <div className="passenger-dashboard-panel">
          <div className="passenger-dashboard-panel-head">
            <div>
              <span className="passenger-dashboard-badge">Quick Actions</span>
              <h2>Passenger Tools</h2>
            </div>
          </div>

          <div className="passenger-dashboard-actions">
            <Link to="/passenger/book" className="passenger-dashboard-action-card">
              <FaTicketAlt />
              <h3>Book Ticket</h3>
              <p>Create a new ticket and save it in the bookings table.</p>
            </Link>

            <Link
              to="/passenger/schedule"
              className="passenger-dashboard-action-card"
            >
              <FaBusAlt />
              <h3>Bus Schedule</h3>
              <p>View active routes, fares, stops, and departure times.</p>
            </Link>

            <Link
              to="/passenger/bookings"
              className="passenger-dashboard-action-card"
            >
              <FaCalendarAlt />
              <h3>My Bookings</h3>
              <p>Check your booked, cancelled, and completed tickets.</p>
            </Link>
          </div>
        </div>

        <div className="passenger-dashboard-panel">
          <div className="passenger-dashboard-panel-head">
            <div>
              <span className="passenger-dashboard-badge">Summary</span>
              <h2>Booking Status</h2>
            </div>
          </div>

          <div className="passenger-dashboard-summary-list">
            <div className="passenger-dashboard-summary-item">
              <span>Total bookings</span>
              <strong>{bookings.length}</strong>
            </div>

            <div className="passenger-dashboard-summary-item">
              <span>Active bookings</span>
              <strong>{activeBookings.length}</strong>
            </div>

            <div className="passenger-dashboard-summary-item">
              <span>Cancelled bookings</span>
              <strong>{cancelledBookings.length}</strong>
            </div>

            <div className="passenger-dashboard-summary-item">
              <span>Available routes</span>
              <strong>{routes.length}</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}