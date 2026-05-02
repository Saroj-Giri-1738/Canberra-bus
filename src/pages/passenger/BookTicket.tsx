import { useEffect, useMemo, useState } from "react";
import "./PassengerPages.css";
import {
  FaBusAlt,
  FaCalendarAlt,
  FaChair,
  FaClock,
  FaMapMarkedAlt,
  FaTicketAlt,
  FaSyncAlt,
} from "react-icons/fa";
import {
  createPassengerBooking,
  formatTime,
  getPassengerRoutes,
  type PassengerRoute,
} from "../../services/passengerApi";

export default function BookTicket() {
  const [routes, setRoutes] = useState<PassengerRoute[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [seats, setSeats] = useState("1");
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRoutes = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getPassengerRoutes();
      setRoutes(data);

      if (data.length > 0 && !selectedRouteId) {
        setSelectedRouteId(String(data[0].id));
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();

    const today = new Date().toISOString().slice(0, 10);
    setTravelDate(today);
  }, []);

  const selectedRoute = useMemo(() => {
    return routes.find((route) => String(route.id) === selectedRouteId) || null;
  }, [routes, selectedRouteId]);

  const totalAmount = useMemo(() => {
    if (!selectedRoute) return 0;

    return Number(selectedRoute.fare) * Number(seats || 1);
  }, [selectedRoute, seats]);

  const handleBookTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRouteId || !travelDate || !seats) {
      alert("Please select route, travel date, and seats.");
      return;
    }

    try {
      setBooking(true);

      await createPassengerBooking({
        route_id: Number(selectedRouteId),
        travel_date: travelDate,
        seats: Number(seats),
      });

      alert("Ticket booked successfully and saved in MySQL bookings table.");

      setSeats("1");
    } catch (error: any) {
      alert(error.message || "Failed to book ticket");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="passenger-page">
        <section className="passenger-panel">
          <h2>Loading routes...</h2>
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
          <h1>Book Ticket</h1>
          <p>
            Select a route, choose your travel date and seats, then save your
            booking directly into the MySQL bookings table.
          </p>
        </div>

        <button className="passenger-btn light" onClick={loadRoutes}>
          <FaSyncAlt />
          Refresh Routes
        </button>
      </section>

      <section className="passenger-grid">
        <div className="passenger-panel">
          <div className="passenger-panel-head">
            <div>
              <span className="passenger-badge">Booking Form</span>
              <h2>Create New Booking</h2>
            </div>
          </div>

          <form className="passenger-form" onSubmit={handleBookTicket}>
            <div className="passenger-input-group">
              <label>Select Route</label>
              <select
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                required
              >
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.route_name} - ${route.fare}
                  </option>
                ))}
              </select>
            </div>

            <div className="passenger-input-group">
              <label>Travel Date</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                required
              />
            </div>

            <div className="passenger-input-group">
              <label>Seats</label>
              <input
                type="number"
                min="1"
                max="10"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                required
              />
            </div>

            <button className="passenger-btn" type="submit" disabled={booking}>
              <FaTicketAlt />
              {booking ? "Booking..." : "Book Ticket"}
            </button>
          </form>
        </div>

        <div className="passenger-panel">
          <div className="passenger-panel-head">
            <div>
              <span className="passenger-badge">Preview</span>
              <h2>Ticket Summary</h2>
            </div>
          </div>

          {selectedRoute ? (
            <div className="passenger-ticket-preview">
              <div className="passenger-ticket-route">
                <h3>{selectedRoute.route_name}</h3>
                <p>
                  {selectedRoute.source} → {selectedRoute.destination}
                </p>
              </div>

              <div className="passenger-info-list">
                <div className="passenger-info-item">
                  <FaClock />
                  <span>
                    {formatTime(selectedRoute.departure_time)} -{" "}
                    {formatTime(selectedRoute.arrival_time)}
                  </span>
                </div>

                <div className="passenger-info-item">
                  <FaCalendarAlt />
                  <span>{travelDate || "Select date"}</span>
                </div>

                <div className="passenger-info-item">
                  <FaChair />
                  <span>{seats} seat(s)</span>
                </div>

                <div className="passenger-info-item">
                  <FaBusAlt />
                  <span>Fare per seat: ${selectedRoute.fare}</span>
                </div>

                <div className="passenger-info-item">
                  <FaMapMarkedAlt />
                  <span>
                    Stops:{" "}
                    {selectedRoute.stops && selectedRoute.stops.length > 0
                      ? selectedRoute.stops.join(", ")
                      : "No stops listed"}
                  </span>
                </div>
              </div>

              <div className="passenger-total-box">
                <span>Total Amount</span>
                <strong>${totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <p>No route selected.</p>
          )}
        </div>
      </section>
    </div>
  );
}