import "./PassengerPages.css";
import { FaTicketAlt, FaCalendarAlt, FaBusAlt } from "react-icons/fa";

export default function MyBookings() {
  const bookings = [
    {
      route: "Canberra City → Belconnen",
      date: "06 Apr 2026",
      time: "08:30 AM",
      status: "Confirmed",
      bus: "Express Line 1",
    },
    {
      route: "ANU → Civic",
      date: "08 Apr 2026",
      time: "10:00 AM",
      status: "Pending",
      bus: "Campus Shuttle",
    },
    {
      route: "Woden → Airport",
      date: "01 Apr 2026",
      time: "11:20 AM",
      status: "Completed",
      bus: "Airport Connect",
    },
  ];

  return (
    <div className="passenger-page">
      <section className="passenger-page-hero">
        <div>
          <span className="passenger-page-badge">Passenger Services</span>
          <h1>My Bookings</h1>
          <p>
            View your current and previous trips, check ticket status, and stay
            organized with your travel records.
          </p>
        </div>
      </section>

      <section className="summary-grid">
        <div className="summary-card">
          <h3>03</h3>
          <p>Total Bookings</p>
        </div>
        <div className="summary-card">
          <h3>02</h3>
          <p>Upcoming Trips</p>
        </div>
        <div className="summary-card">
          <h3>01</h3>
          <p>Completed Trips</p>
        </div>
      </section>

      <section className="passenger-page-panel">
        <h2>Booking History</h2>
        <p>All your ticket reservations and trip records are listed below.</p>

        <div className="booking-list">
          {bookings.map((booking, index) => (
            <div className="booking-card" key={index}>
              <div className="booking-top">
                <h3>{booking.route}</h3>
                <span
                  className={`status-pill ${
                    booking.status === "Confirmed"
                      ? "confirmed"
                      : booking.status === "Pending"
                      ? "pending"
                      : "completed"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="booking-meta">
                <span><FaCalendarAlt /> {booking.date}</span>
                <span><FaTicketAlt /> {booking.time}</span>
                <span><FaBusAlt /> {booking.bus}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}