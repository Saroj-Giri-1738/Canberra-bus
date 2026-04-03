import { useMemo, useState } from "react";
import heroImage from "../../assets/images/bus-hero.png";
import {
  FaBusAlt,
  FaMapMarkedAlt,
  FaUserShield,
  FaClock,
  FaSearch,
  FaTicketAlt,
  FaRoute,
  FaArrowRight,
  FaUsers,
  FaIdBadge,
  FaUserCog,
  FaStar,
} from "react-icons/fa";

type RouteResult = {
  from: string;
  to: string;
  departure: string;
  bus: string;
  seats: string;
  type: string;
};

const demoRoutes: RouteResult[] = [
  {
    from: "Canberra City",
    to: "Belconnen",
    departure: "08:30 AM",
    bus: "Express Line 1",
    seats: "12 seats left",
    type: "Express",
  },
  {
    from: "Canberra City",
    to: "Gungahlin",
    departure: "09:15 AM",
    bus: "Rapid Route 2",
    seats: "8 seats left",
    type: "Rapid",
  },
  {
    from: "ANU",
    to: "Civic",
    departure: "10:00 AM",
    bus: "Campus Shuttle",
    seats: "Available",
    type: "Shuttle",
  },
  {
    from: "Woden",
    to: "Airport",
    departure: "11:20 AM",
    bus: "Airport Connect",
    seats: "5 seats left",
    type: "Direct",
  },
];

export default function Home() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const filteredRoutes = useMemo(() => {
    if (!hasSearched) return [];

    return demoRoutes.filter((route) => {
      const matchesSource = source
        ? route.from.toLowerCase().includes(source.toLowerCase())
        : true;

      const matchesDestination = destination
        ? route.to.toLowerCase().includes(destination.toLowerCase())
        : true;

      return matchesSource && matchesDestination;
    });
  }, [source, destination, hasSearched]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <>
      <section
        className="hero hero-banner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <p className="eyebrow">Smart public transport for Canberra</p>
          <h1>Welcome to Canberra Bus Company</h1>
          <p>
            Safe, reliable, and comfortable transport services connecting
            passengers across Canberra every day.
          </p>
          <p>
            Our platform is designed to help passengers manage travel, drivers
            handle daily duties, and administrators monitor routes and fleet
            operations efficiently.
          </p>

          <div className="hero-buttons">
            <a href="/about" className="primary-link-btn">
              Explore Services
            </a>
            <a href="/login" className="secondary-link-btn">
              Get Started
            </a>
          </div>
        </div>
      </section>

      <section className="home-search-wrap">
        <div className="search-box">
          <div className="search-item">
            <label>Source</label>
            <input
              type="text"
              placeholder="Ex: Canberra City"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>

          <div className="swap-icon">⇄</div>

          <div className="search-item">
            <label>Destination</label>
            <input
              type="text"
              placeholder="Ex: Belconnen"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className="search-item">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="search-item">
            <label>Return Date</label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>

          <button className="search-btn-home" onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h3>25+</h3>
          <p>Active Routes</p>
        </div>
        <div className="stat-card">
          <h3>80+</h3>
          <p>Daily Trips</p>
        </div>
        <div className="stat-card">
          <h3>40+</h3>
          <p>Modern Buses</p>
        </div>
        <div className="stat-card">
          <h3>500+</h3>
          <p>Passengers Weekly</p>
        </div>
      </section>

      <section className="home-panel">
        <div className="section-heading">
          <p className="eyebrow">Available routes</p>
          <h2>Search results</h2>
        </div>

        {!hasSearched ? (
          <div className="empty-state">
            <FaSearch className="empty-state-icon" />
            <h3>Search for your next trip</h3>
            <p>
              Enter a source and destination above to explore route options.
            </p>
          </div>
        ) : filteredRoutes.length > 0 ? (
          <div className="route-results-grid">
            {filteredRoutes.map((route, index) => (
              <div className="route-result-card" key={`${route.bus}-${index}`}>
                <div className="route-result-top">
                  <span className="route-badge">{route.type}</span>
                  <span className="route-seats">{route.seats}</span>
                </div>

                <h3>
                  {route.from} <FaArrowRight className="inline-arrow" /> {route.to}
                </h3>

                <p>
                  <strong>Departure:</strong> {route.departure}
                </p>
                <p>
                  <strong>Bus:</strong> {route.bus}
                </p>

                <button className="primary-btn result-btn">Book Now</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaRoute className="empty-state-icon" />
            <h3>No matching routes found</h3>
            <p>Try another source or destination.</p>
          </div>
        )}
      </section>

      <section className="home-panel">
        <div className="section-heading">
          <p className="eyebrow">Popular routes</p>
          <h2>Common destinations across Canberra</h2>
        </div>

        <div className="popular-routes-grid">
          <div className="popular-route-card">
            <h3>Canberra City → Belconnen</h3>
            <p>Fast daily route used by students and office workers.</p>
          </div>
          <div className="popular-route-card">
            <h3>Canberra City → Gungahlin</h3>
            <p>One of the busiest and most reliable commuter routes.</p>
          </div>
          <div className="popular-route-card">
            <h3>ANU → Civic</h3>
            <p>Simple campus travel with convenient stop coverage.</p>
          </div>
          <div className="popular-route-card">
            <h3>Woden → Airport</h3>
            <p>Direct transport for regular airport travellers.</p>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="section-heading">
          <p className="eyebrow">Why choose us</p>
          <h2>Designed for better travel experiences</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <FaBusAlt className="feature-icon" />
            <h3>Reliable Transport</h3>
            <p>
              Our buses operate on planned schedules to help passengers travel
              with confidence and convenience.
            </p>
          </div>

          <div className="feature-card">
            <FaMapMarkedAlt className="feature-icon" />
            <h3>Clear Route Planning</h3>
            <p>
              Explore routes, stops, and assigned buses through an easy-to-use
              digital platform.
            </p>
          </div>

          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h3>Time Efficiency</h3>
            <p>
              Improve travel coordination with faster access to booking details,
              route information, and trip planning.
            </p>
          </div>

          <div className="feature-card">
            <FaUserShield className="feature-icon" />
            <h3>Safe & Managed Service</h3>
            <p>
              Our system supports better coordination between passengers,
              drivers, and administrative teams.
            </p>
          </div>
        </div>
      </section>

      <section className="home-panel">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>Book your trip in 4 simple steps</h2>
        </div>

        <div className="how-grid">
          <div className="how-card">
            <FaSearch className="how-icon" />
            <h3>1. Search Route</h3>
            <p>Enter your source and destination to find available trips.</p>
          </div>
          <div className="how-card">
            <FaRoute className="how-icon" />
            <h3>2. Select Bus</h3>
            <p>Choose the route and departure time that fits your plan.</p>
          </div>
          <div className="how-card">
            <FaTicketAlt className="how-icon" />
            <h3>3. Book Ticket</h3>
            <p>Confirm your trip and keep track of your booking easily.</p>
          </div>
          <div className="how-card">
            <FaBusAlt className="how-icon" />
            <h3>4. Travel Smart</h3>
            <p>Ride with confidence using a more organized transport system.</p>
          </div>
        </div>
      </section>

      <section className="home-panel role-panel">
        <div className="section-heading">
          <p className="eyebrow">Quick access</p>
          <h2>Choose your portal</h2>
        </div>

        <div className="role-grid">
          <a href="/passenger/dashboard" className="role-card">
            <FaUsers className="role-icon" />
            <h3>Passenger</h3>
            <p>Browse routes, book tickets, and manage your trips.</p>
          </a>

          <a href="/driver/dashboard" className="role-card">
            <FaIdBadge className="role-icon" />
            <h3>Driver</h3>
            <p>View assigned routes, attendance, and driving tasks.</p>
          </a>

          <a href="/admin/dashboard" className="role-card">
            <FaUserCog className="role-icon" />
            <h3>Admin</h3>
            <p>Manage buses, users, routes, and operational reports.</p>
          </a>
        </div>
      </section>

      <section className="split-section">
        <div>
          <p className="eyebrow">For passengers</p>
          <h2>Simple booking and route access</h2>
          <p className="section-text">
            Passengers can browse routes, select travel dates, and review
            bookings from a single dashboard. The platform is designed to make
            daily transport management straightforward and stress-free.
          </p>
        </div>
        <div className="split-card">
          <h3>Passenger Benefits</h3>
          <ul className="styled-list">
            <li>View available bus routes</li>
            <li>Book tickets easily</li>
            <li>Check personal bookings</li>
            <li>Access route details quickly</li>
          </ul>
        </div>
      </section>

      <section className="split-section reverse">
        <div className="split-card">
          <h3>Operational Benefits</h3>
          <ul className="styled-list">
            <li>Driver duty visibility</li>
            <li>Attendance monitoring</li>
            <li>Bus and route oversight</li>
            <li>Improved admin control</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">For operations</p>
          <h2>Stronger management for drivers and admins</h2>
          <p className="section-text">
            The platform helps driver teams handle route assignments and daily
            attendance, while administrators can manage users, buses, routes,
            and operational reports from one place.
          </p>
        </div>
      </section>

      <section className="home-panel">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>What users say about Canberra Bus</h2>
        </div>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “The booking layout is simple and quick. It makes daily travel
              much easier.”
            </p>
            <h4>— John, Passenger</h4>
          </div>

          <div className="testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “The system helps organize routes and attendance without confusion.”
            </p>
            <h4>— Emma, Driver</h4>
          </div>

          <div className="testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “A clean dashboard for managing buses, users, and trip reports.”
            </p>
            <h4>— Sarah, Administrator</h4>
          </div>
        </div>
      </section>
    </>
  );
}