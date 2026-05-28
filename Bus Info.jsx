import { FaBus, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function BusInfo() {
  const buses = [
    { id: "101", route: "City → Belconnen", status: "On Time" },
    { id: "102", route: "City → Gungahlin", status: "Delayed" },
    { id: "103", route: "Woden → Airport", status: "On Time" },
  ];

  return (
    <div className="bus-info-page">
      <h1>Canberra Bus Live Info</h1>

      <div className="bus-grid">
        {buses.map((bus, index) => (
          <div key={index} className="bus-card">
            <FaBus className="bus-icon" />
            <h3>Bus {bus.id}</h3>
            <p>
              <FaMapMarkerAlt /> {bus.route}
            </p>
            <p>
              <FaClock /> Status: {bus.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
