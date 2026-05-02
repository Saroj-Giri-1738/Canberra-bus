import { useEffect, useState } from "react";
import "./PassengerPages.css";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkedAlt,
  FaSyncAlt,
  FaTicketAlt,
  FaTimesCircle,
} from "react-icons/fa";
import {
  formatDate,
  formatTime,
  getPassengerBookings,
  updatePassengerBookingStatus,
  type PassengerBooking,
} from "../../services/passengerApi";

export default function MyBookings() {
  const [bookings, setBookings] = useState<PassengerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getPassengerBookings();
      setBookings(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancelBooking = async (bookingId: number) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await updatePassengerBookingStatus(bookingId, "Cancelled");
      await loadBookings();
    } catch (error: any) {
      alert(error.message || "Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="passenger-page">
        <section className="passenger-panel">
          <h2>Loading bookings...</h2>
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
          <button className="passenger-btn" onClick={loadBookings}>
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
          <h1>My Bookings</h1>
          <p>
            View your booked tickets from the MySQL bookings table and cancel
            tickets if required.
          </p>
        </div>

        <button className="passenger-btn light" onClick={loadBookings}>
          <FaSyncAlt />
          Refresh Bookings
        </button>
      </section>

      <section className="passenger-panel">
        <div className="passenger-panel-head">
          <div>
            <span className="passenger-badge">MySQL Data</span>
            <h2>Booking History</h2>
          </div>

          <strong>{bookings.length} booking(s)</strong>
        </div>

        {bookings.length === 0 ? (
          <div className="passenger-empty-state">
            <FaTicketAlt />
            <h3>No bookings found</h3>
            <p>Your booked tickets will appear here after you book a route.</p>
          </div>
        ) : (
          <div className="passenger-booking-list">
            {bookings.map((booking) => (
              <div className="passenger-booking-card" key={booking.booking_id}>
                <div className="passenger-booking-top">
                  <div>
                    <h3>{booking.route_name}</h3>
                    <p>
                      {booking.source} → {booking.destination}
                    </p>
                  </div>

                  <span
                    className={`passenger-status ${
                      booking.booking_status === "Booked"
                        ? "passenger-status-booked"
                        : booking.booking_status === "Cancelled"
                        ? "passenger-status-cancelled"
                        : "passenger-status-completed"
                    }`}
                  >
                    {booking.booking_status}
                  </span>
                </div>

                <div className="passenger-booking-meta">
                  <span>
                    <FaCalendarAlt />
                    Travel: {formatDate(booking.travel_date)}
                  </span>

                  <span>
                    <FaClock />
                    {formatTime(booking.departure_time)} -{" "}
                    {formatTime(booking.arrival_time)}
                  </span>

                  <span>
                    <FaTicketAlt />
                    {booking.seats} seat(s)
                  </span>

                  <span>
                    <FaMapMarkedAlt />
                    Booked on {formatDate(booking.booking_date)}
                  </span>
                </div>

                <div className="passenger-booking-footer">
                  <strong>${Number(booking.total_amount).toFixed(2)}</strong>

                  {booking.booking_status === "Booked" && (
                    <button
                      className="passenger-btn danger"
                      onClick={() => handleCancelBooking(booking.booking_id)}
                    >
                      <FaTimesCircle />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}