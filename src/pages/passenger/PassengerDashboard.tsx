import {
  FaBusAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaTicketAlt,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaRoute,
  FaDownload,
  FaPlusCircle,
} from "react-icons/fa";
import "./PassengerDashboard.css";

export default function PassengerDashboard() {
  const passengerName =
    JSON.parse(localStorage.getItem("user") || "{}")?.fullName || "Passenger";

  const stats = [
    { title: "Active Bookings", value: "03", icon: <FaTicketAlt /> },
    { title: "Upcoming Trips", value: "02", icon: <FaCalendarAlt /> },
    { title: "Saved Routes", value: "05", icon: <FaRoute /> },
    { title: "Travel Points", value: "120", icon: <FaBusAlt /> },
  ];

  const bookings = [
    {
      route: "Canberra City → Belconnen",
      date: "06 Apr 2026",
      time: "08:30 AM",
      status: "Confirmed",
    },
    {
      route: "ANU → Civic",
      date: "08 Apr 2026",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      route: "Woden → Airport",
      date: "10 Apr 2026",
      time: "11:20 AM",
      status: "Confirmed",
    },
  ];

  return (
    <div className="passenger-dashboard">
      <section className="passenger-hero">
        <div>
          <p className="eyebrow">Passenger dashboard</p>
          <h1>Welcome back, {passengerName}</h1>
          <p className="dashboard-subtext">
            Manage your trips, view bookings, and quickly find the next available
            bus route across Canberra.
          </p>
        </div>

        <div className="passenger-hero-actions">
          <button className="dashboard-primary-btn">
            <FaPlusCircle />
            Book New Trip
          </button>
          <button className="dashboard-secondary-btn">
            <FaDownload />
            Download Ticket
          </button>
        </div>
      </section>

      <section className="passenger-stats-grid">
        {stats.map((item) => (
          <div className="passenger-stat-card" key={item.title}>
            <div className="passenger-stat-icon">{item.icon}</div>
            <div>
              <h3>{item.value}</h3>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="passenger-main-grid">
        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Next trip</p>
              <h2>Your upcoming journey</h2>
            </div>
          </div>

          <div className="next-trip-card">
            <div className="trip-route-row">
              <div>
                <span className="trip-label">From</span>
                <h3>Canberra City</h3>
              </div>

              <FaArrowRight className="trip-arrow" />

              <div>
                <span className="trip-label">To</span>
                <h3>Belconnen</h3>
              </div>
            </div>

            <div className="trip-meta-grid">
              <div className="trip-meta-item">
                <FaCalendarAlt />
                <span>06 Apr 2026</span>
              </div>
              <div className="trip-meta-item">
                <FaClock />
                <span>08:30 AM</span>
              </div>
              <div className="trip-meta-item">
                <FaBusAlt />
                <span>Express Line 1</span>
              </div>
              <div className="trip-meta-item">
                <FaMapMarkedAlt />
                <span>Platform 3</span>
              </div>
            </div>

            <div className="trip-status-row">
              <span className="status-pill confirmed">Confirmed</span>
              <button className="dashboard-primary-btn small-btn">
                View Ticket
              </button>
            </div>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Quick search</p>
              <h2>Find a route</h2>
            </div>
          </div>

          <div className="dashboard-search-box">
            <div className="dashboard-input-group">
              <label>Source</label>
              <input type="text" placeholder="Ex: Canberra City" />
            </div>

            <div className="dashboard-input-group">
              <label>Destination</label>
              <input type="text" placeholder="Ex: Belconnen" />
            </div>

            <div className="dashboard-input-group">
              <label>Date</label>
              <input type="date" />
            </div>

            <button className="dashboard-primary-btn full-btn">
              <FaSearch />
              Search Route
            </button>
          </div>
        </div>
      </section>

      <section className="passenger-bottom-grid">
        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">My bookings</p>
              <h2>Recent bookings</h2>
            </div>
          </div>

          <div className="bookings-list">
            {bookings.map((booking, index) => (
              <div className="booking-row" key={index}>
                <div className="booking-main">
                  <h3>{booking.route}</h3>
                  <p>
                    {booking.date} • {booking.time}
                  </p>
                </div>

                <span
                  className={`status-pill ${
                    booking.status === "Confirmed" ? "confirmed" : "pending"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="panel-head">
            <div>
              <p className="eyebrow">Quick actions</p>
              <h2>What would you like to do?</h2>
            </div>
          </div>

          <div className="quick-actions-grid">
            <a href="/passenger/bookticket" className="quick-action-card">
              <FaTicketAlt className="quick-action-icon" />
              <h3>Book Ticket</h3>
              <p>Reserve your next trip quickly and easily.</p>
            </a>

            <a href="/passenger/mybookings" className="quick-action-card">
              <FaCalendarAlt className="quick-action-icon" />
              <h3>My Bookings</h3>
              <p>Review your travel history and active reservations.</p>
            </a>

            <a href="/passenger/busschedule" className="quick-action-card">
              <FaBusAlt className="quick-action-icon" />
              <h3>Bus Schedule</h3>
              <p>Check route timing and daily departure details.</p>
            </a>

            <a href="/" className="quick-action-card">
              <FaMapMarkedAlt className="quick-action-icon" />
              <h3>Explore Routes</h3>
              <p>Search available routes across Canberra.</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}