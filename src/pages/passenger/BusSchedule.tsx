import "./PassengerPages.css";
import { FaBusAlt, FaClock, FaMapMarkedAlt, FaCalendarAlt } from "react-icons/fa";

export default function BusSchedule() {
  const schedules = [
    {
      route: "Canberra City → Belconnen",
      bus: "Express Line 1",
      time: "08:30 AM",
      date: "06 Apr 2026",
      stop: "Platform 3",
    },
    {
      route: "ANU → Civic",
      bus: "Campus Shuttle",
      time: "10:00 AM",
      date: "06 Apr 2026",
      stop: "Stop B2",
    },
    {
      route: "Woden → Airport",
      bus: "Airport Connect",
      time: "11:20 AM",
      date: "06 Apr 2026",
      stop: "Gate 4",
    },
  ];

  return (
    <div className="passenger-page">
      <section className="passenger-page-hero">
        <div>
          <span className="passenger-page-badge">Passenger Services</span>
          <h1>Bus Schedule</h1>
          <p>
            Check upcoming bus departures, route timing, and stop information
            for your next trip across Canberra.
          </p>
        </div>
      </section>

      <section className="passenger-page-panel">
        <h2>Available Schedules</h2>
        <p>Browse the latest departures and route timing below.</p>

        <div className="schedule-list">
          {schedules.map((item, index) => (
            <div className="schedule-card" key={index}>
              <div className="schedule-top">
                <h3>{item.route}</h3>
                <span className="status-pill confirmed">On Time</span>
              </div>

              <div className="schedule-meta">
                <span><FaBusAlt /> {item.bus}</span>
                <span><FaClock /> {item.time}</span>
                <span><FaCalendarAlt /> {item.date}</span>
                <span><FaMapMarkedAlt /> {item.stop}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
