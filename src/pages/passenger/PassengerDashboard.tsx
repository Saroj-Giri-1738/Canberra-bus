import { useNavigate } from "react-router-dom";
import {
  FaBusAlt,
  FaCalendarAlt,
  FaTicketAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./PassengerDashboard.css";

export default function PassengerDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Bookings", value: "3", icon: "🎫" },
    { label: "Trips This Month", value: "12", icon: "📍" },
    { label: "Total Saved", value: "$245", icon: "💰" },
  ];

  const actionCards = [
    {
      title: "Book a Ticket",
      description: "Find and book your next journey",
      icon: <FaTicketAlt />,
      path: "/passenger/book-ticket",
    },
    {
      title: "Bus Schedule",
      description: "View routes and timetables",
      icon: <FaCalendarAlt />,
      path: "/passenger/schedule",
    },
    {
      title: "Track Bus",
      description: "Real-time bus tracking",
      icon: <FaMapMarkerAlt />,
      path: "/passenger/bookings",
    },
    {
      title: "My Bookings",
      description: "Manage your reservations",
      icon: <FaBusAlt />,
      path: "/passenger/bookings",
    },
  ];

  const recentBookings = [
    {
      route: "City Center → Airport",
      date: "Today, 9:30 AM",
      status: "Confirmed",
      statusType: "confirmed",
    },
    {
      route: "University Campus → Downtown",
      date: "Mar 31, 2:15 PM",
      status: "Upcoming",
      statusType: "upcoming",
    },
    {
      route: "Central Station → Shopping Mall",
      date: "Mar 25, 5:00 PM",
      status: "Completed",
      statusType: "completed",
    },
  ];

  return (
    <div className="passenger-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard 👋</h1>
        <p>Manage your bus bookings and travels</p>
      </div>

      {/* Stats Grid */}
      <section className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Action Cards */}
      <section className="actions-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          {actionCards.map((card, idx) => (
            <button
              key={idx}
              className="action-card"
              onClick={() => navigate(card.path)}
            >
              <div className="action-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span className="action-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Bookings */}
      <section className="bookings-section">
        <h2>Recent Bookings</h2>
        <div className="bookings-list">
          {recentBookings.map((booking, idx) => (
            <div key={idx} className="booking-item">
              <div className="booking-info">
                <p className="booking-route">{booking.route}</p>
                <p className="booking-date">{booking.date}</p>
              </div>
              <span className={`booking-status ${booking.statusType}`}>
                {booking.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}