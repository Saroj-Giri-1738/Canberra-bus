import "./PassengerPages.css";
import {
  FaTicketAlt,
  FaBusAlt,
  FaCalendarAlt,
  FaMapMarkedAlt,
  FaCreditCard,
  FaArrowRight,
} from "react-icons/fa";

export default function BookTicket() {
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
              <input type="text" placeholder="Ex: Canberra City" />
            </div>

            <div className="passenger-form-group">
              <label>Destination</label>
              <input type="text" placeholder="Ex: Belconnen" />
            </div>

            <div className="passenger-form-group">
              <label>Travel Date</label>
              <input type="date" />
            </div>

            <div className="passenger-form-group">
              <label>Departure Time</label>
              <select>
                <option>08:30 AM</option>
                <option>10:00 AM</option>
                <option>11:20 AM</option>
                <option>02:00 PM</option>
              </select>
            </div>

            <div className="passenger-form-group">
              <label>Passenger Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>

            <div className="passenger-form-group">
              <label>Seat Type</label>
              <select>
                <option>Standard</option>
                <option>Window</option>
                <option>Priority</option>
              </select>
            </div>

            <div className="passenger-form-group full-width">
              <label>Payment Method</label>
              <select>
                <option>Card Payment</option>
                <option>Wallet</option>
                <option>Cash on Counter</option>
              </select>
            </div>
          </div>

          <div className="action-row">
            <button className="passenger-btn">
              <FaTicketAlt />
              Confirm Booking
            </button>
            <button className="passenger-btn secondary">Save for Later</button>
          </div>
        </div>

        <div className="passenger-page-panel">
          <div className="passenger-info-card">
            <h3>Trip Summary</h3>

            <div className="passenger-info-list">
              <div className="passenger-info-item">
                <FaMapMarkedAlt />
                <span>Canberra City → Belconnen</span>
              </div>

              <div className="passenger-info-item">
                <FaCalendarAlt />
                <span>06 Apr 2026 • 08:30 AM</span>
              </div>

              <div className="passenger-info-item">
                <FaBusAlt />
                <span>Express Line 1</span>
              </div>

              <div className="passenger-info-item">
                <FaCreditCard />
                <span>Estimated Fare: $4.50</span>
              </div>

              <div className="passenger-info-item">
                <FaArrowRight />
                <span>Platform 3 • 12 seats available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
