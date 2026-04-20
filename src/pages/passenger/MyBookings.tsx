import "./PassengerPages.css";
import { FaTicketAlt, FaCalendarAlt, FaBusAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);

  const handleDeleteBooking = (id: number) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const totalBookings = bookings.length;
  const upcomingTrips = bookings.filter((b) => b.status === "Confirmed").length;
  const completedTrips = bookings.filter((b) => b.status === "Completed").length;

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
          <h3>{String(totalBookings).padStart(2, "0")}</h3>
          <p>Total Bookings</p>
        </div>
        <div className="summary-card">
          <h3>{String(upcomingTrips).padStart(2, "0")}</h3>
          <p>Upcoming Trips</p>
        </div>
        <div className="summary-card">
          <h3>{String(completedTrips).padStart(2, "0")}</h3>
          <p>Completed Trips</p>
        </div>
      </section>

      <section className="passenger-page-panel">
        <h2>Booking History</h2>
        <p>All your ticket reservations and trip records are listed below.</p>

        <div className="booking-list">
          {bookings.length === 0 ? (
            <div className="booking-card">
              <div className="booking-top">
                <h3>No bookings yet</h3>
              </div>
              <div className="booking-meta">
                <span>Book a trip to see it here.</span>
              </div>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <div className="booking-card" key={index}>
                <div className="booking-top">
                  <h3>
                    {booking.source} → {booking.destination}
                  </h3>
                  <span className="status-pill confirmed">
                    {booking.status}
                  </span>
                </div>

                <div className="booking-meta">
                  <span><FaCalendarAlt /> {booking.travelDate}</span>
                  <span><FaTicketAlt /> {booking.departureTime}</span>
                  <span><FaBusAlt /> {booking.bus}</span>
                </div>

                <div className="action-row">
                  <button
                    className="passenger-btn secondary"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    <FaTrash />
                    Delete Booking
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}