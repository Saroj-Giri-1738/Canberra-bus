import heroImage from "../../assets/images/bus-hero.png";
import {
  FaBusAlt,
  FaMapMarkedAlt,
  FaUserShield,
  FaClock,
} from "react-icons/fa";

export default function Home() {
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
    </>
  );
}