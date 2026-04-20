import "./PassengerPages.css";
import { useEffect, useState } from "react";
import {
  FaTicketAlt,
  FaBusAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";

export default function BookTicket() {
  const selectedTrip = JSON.parse(localStorage.getItem("selectedTrip") || "null");

  const [source, setSource] = useState(selectedTrip?.route || "");
  const [destination, setDestination] = useState(selectedTrip?.destination || "");
  const [travelDate, setTravelDate] = useState(selectedTrip?.date || "");
  const [departureTime, setDepartureTime] = useState(selectedTrip?.time || "08:30 AM");
  const [passengerName, setPassengerName] = useState("");
  const [seatType, setSeatType] = useState("Standard");
  const [paymentMethod, setPaymentMethod] = useState("Card Payment");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user?.fullName) setPassengerName(user.fullName);
  }, []);

  const handleConfirmBooking = () => {
    if (!source || !destination || !travelDate || !departureTime || !passengerName) {
      alert("Please fill in all required fields.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      source,
      destination,
      travelDate,
      departureTime,
      passengerName,
      seatType,
      paymentMethod,
      bus: selectedTrip?.bus || "Express Line 1",
      status: "Confirmed",
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.unshift(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    setSuccessMessage("Booking confirmed successfully.");
    localStorage.removeItem("selectedTrip");
  };

  return (
    <div className="passenger-page">
      <section className="passenger-page-hero">
        <div>
          <span className="passenger-page-badge">Passenger Services</span>
          <h1>Book Your Ticket</h1>
          <p>
            Search routes, choose travel details, and reserve your next bus trip
            with a cleaner and more user-friendly booking experience.
          </p>
        </div>
      </section>

      <div className="passenger-page-grid">
        <div className="passenger-page-panel">
          <h2>Trip Booking Form</h2>
          <p>Complete the form below to reserve your next journey.</p>

          <div className="passenger-form-grid">
            <div className="passenger-form-group">
              <label>Source</label>
              <input
                type="text"
                placeholder="Ex: Canberra City"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </div>

            <div className="passenger-form-group">
              <label>Destination</label>
              <input
                type="text"
                placeholder="Ex: Belconnen"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="passenger-form-group">
              <label>Travel Date</label>
              <input
                type="text"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                placeholder="06 Apr 2026"
              />
            </div>

            <div className="passenger-form-group">
              <label>Departure Time</label>
              <select
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
              >
                <option>08:30 AM</option>
                <option>10:00 AM</option>
                <option>11:20 AM</option>
                <option>02:00 PM</option>
              </select>
            </div>

            <div className="passenger-form-group">
              <label>Passenger Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
              />
            </div>

            <div className="passenger-form-group">
              <label>Seat Type</label>
              <select
                value={seatType}
                onChange={(e) => setSeatType(e.target.value)}
              >
                <option>Standard</option>
                <option>Window</option>
                <option>Priority</option>
              </select>
            </div>

            <div className="passenger-form-group full-width">
              <label>Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Card Payment</option>
                <option>Wallet</option>
                <option>Cash on Counter</option>
              </select>
            </div>
          </div>

          <div className="action-row">
            <button className="passenger-btn" onClick={handleConfirmBooking}>
              <FaTicketAlt />
              Confirm Booking
            </button>
          </div>

          {successMessage && <div className="passenger-success">{successMessage}</div>}
        </div>

        <div className="passenger-page-panel">
          <div className="passenger-info-card">
            <h3>Trip Summary</h3>

            <div className="passenger-info-list">
              <div className="passenger-info-item">
                <FaMapMarkedAlt />
                <span>
                  {source || "Canberra City"} → {destination || "Belconnen"}
                </span>
              </div>

              <div className="passenger-info-item">
                <FaCalendarAlt />
                <span>{travelDate || "06 Apr 2026"} • {departureTime}</span>
              </div>

              <div className="passenger-info-item">
                <FaBusAlt />
                <span>{selectedTrip?.bus || "Express Line 1"}</span>
              </div>

              <div className="passenger-info-item">
                <FaCreditCard />
                <span>Estimated Fare: $4.50</span>
              </div>

              <div className="passenger-info-item">
                <FaArrowRight />
                <span>{selectedTrip?.stop || "Platform 3"} • 12 seats available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}