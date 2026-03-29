import { useState } from "react";
import type { FormEvent } from "react";
import { mockRoutes } from "../../data/mockData";

export default function BookTicket() {
  const [routeId, setRouteId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Ticket booked successfully!\nRoute ID: ${routeId}\nDate: ${date}`);
  };

  return (
    <div className="form-card">
      <h1>Book Ticket</h1>

      <form onSubmit={handleSubmit} className="login-form">
        <select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          required
        >
          <option value="">Select Route</option>
          {mockRoutes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}