import aboutImage from "../../assets/images/bus-stop.png";
import {
  FaBusAlt,
  FaUsersCog,
  FaRoute,
  FaClipboardList,
  FaBullseye,
  FaUserFriends,
  FaIdBadge,
  FaUserShield,
  FaStar,
  FaArrowRight,
  FaClock,
  FaMapMarkedAlt,
} from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      {/* HERO SECTION */}
      <section className="about-hero-card">
        <div className="about-hero-text">
          <p className="eyebrow">About our company</p>
          <h1>About Canberra Bus Company</h1>
          <p className="about-lead">
            Connecting Canberra with smarter, safer, and more efficient public
            transport for passengers, drivers, and administrators.
          </p>

          <p>
            Canberra Bus Company is a modern transport service platform created
            to support efficient travel and daily operations across the Canberra
            region.
          </p>

          <p>
            The system focuses on delivering value to three key user groups:
            passengers, drivers, and administrators. Each group has access to a
            dedicated area tailored to its responsibilities.
          </p>

          <p>
            Our mission is to combine convenience, reliability, and operational
            efficiency in one connected digital experience.
          </p>

          <div className="about-hero-actions">
            <a href="/" className="primary-link-btn">
              Explore Routes
            </a>
            <a href="/contact" className="secondary-link-btn">
              Contact Us
            </a>
          </div>
        </div>

        <div className="about-image-wrapper">
          <img
            src={aboutImage}
            alt="Canberra bus service"
            className="about-image"
          />
          <div className="about-image-badge badge-top">
            <strong>25+</strong>
            <span>Active Routes</span>
          </div>
          <div className="about-image-badge badge-bottom">
            <strong>500+</strong>
            <span>Weekly Passengers</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="about-stat-box">
          <h3>25+</h3>
          <p>Active Routes</p>
        </div>
        <div className="about-stat-box">
          <h3>80+</h3>
          <p>Daily Trips</p>
        </div>
        <div className="about-stat-box">
          <h3>40+</h3>
          <p>Modern Buses</p>
        </div>
        <div className="about-stat-box">
          <h3>500+</h3>
          <p>Passengers Weekly</p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-panel">
        <div className="section-heading">
          <p className="eyebrow">Why choose us</p>
          <h2>Built for dependable public transport</h2>
        </div>

        <div className="about-why-grid">
          <div className="about-why-card">
            <FaBusAlt className="about-card-icon" />
            <h3>Reliable Service</h3>
            <p>
              We support smooth and organized bus operations across Canberra
              with dependable route coordination.
            </p>
          </div>

          <div className="about-why-card">
            <FaMapMarkedAlt className="about-card-icon" />
            <h3>Route Visibility</h3>
            <p>
              Passengers and staff can easily access route details, stops, and
              transport information in one place.
            </p>
          </div>

          <div className="about-why-card">
            <FaClock className="about-card-icon" />
            <h3>Time Saving</h3>
            <p>
              Faster booking, route management, and reporting help reduce delays
              and improve daily operations.
            </p>
          </div>

          <div className="about-why-card">
            <FaUserShield className="about-card-icon" />
            <h3>Managed Platform</h3>
            <p>
              The platform supports safer and more coordinated experiences for
              passengers, drivers, and administrators.
            </p>
          </div>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="about-panel">
        <div className="section-heading">
          <p className="eyebrow">What we provide</p>
          <h2>Core platform services</h2>
        </div>

        <div className="about-services-grid">
          <div className="about-service-card">
            <FaBusAlt className="about-card-icon" />
            <h3>Fleet Visibility</h3>
            <p>
              Track buses, assignments, and availability more efficiently across
              your transport system.
            </p>
          </div>

          <div className="about-service-card">
            <FaRoute className="about-card-icon" />
            <h3>Route Management</h3>
            <p>
              Organize route structures, stop details, and travel planning in
              one system.
            </p>
          </div>

          <div className="about-service-card">
            <FaClipboardList className="about-card-icon" />
            <h3>Bookings & Records</h3>
            <p>
              Maintain travel bookings, attendance data, and trip information
              through simple interfaces.
            </p>
          </div>

          <div className="about-service-card">
            <FaUsersCog className="about-card-icon" />
            <h3>User Administration</h3>
            <p>
              Manage passengers, drivers, and admin roles efficiently with
              better operational control.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="about-panel about-role-panel">
        <div className="section-heading">
          <p className="eyebrow">Who we serve</p>
          <h2>One platform for every transport role</h2>
        </div>

        <div className="about-role-grid">
          <div className="about-role-card">
            <FaUserFriends className="about-card-icon" />
            <h3>Passengers</h3>
            <p>
              Search routes, book tickets, and manage day-to-day travel with
              ease.
            </p>
          </div>

          <div className="about-role-card">
            <FaIdBadge className="about-card-icon" />
            <h3>Drivers</h3>
            <p>
              Check assigned routes, attendance, and daily operational
              responsibilities.
            </p>
          </div>

          <div className="about-role-card">
            <FaUserShield className="about-card-icon" />
            <h3>Administrators</h3>
            <p>
              Oversee buses, users, routes, and reports from one organized
              dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* STORY / TIMELINE */}
      <section className="about-story-section">
        <div className="section-heading">
          <p className="eyebrow">Our story</p>
          <h2>What drives Canberra Bus Company</h2>
        </div>

        <div className="about-story-grid">
          <div className="about-story-card">
            <h3>Our Mission</h3>
            <p>
              To simplify transport management and improve travel experiences
              through a connected and user-friendly platform.
            </p>
          </div>

          <div className="about-story-card">
            <h3>What We Do</h3>
            <p>
              We support trip planning, route management, booking access, and
              daily transport coordination.
            </p>
          </div>

          <div className="about-story-card">
            <h3>Who We Support</h3>
            <p>
              Our services are designed for passengers, drivers, and
              administrative staff with role-based access.
            </p>
          </div>

          <div className="about-story-card">
            <h3>Our Goal</h3>
            <p>
              To create more dependable, organized, and efficient transport
              services across Canberra.
            </p>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="about-vision-highlight">
        <div className="vision-icon-wrap">
          <FaBullseye className="vision-icon" />
        </div>
        <div>
          <p className="eyebrow">Our vision</p>
          <h2>Smarter transport for a better Canberra</h2>
          <p className="section-text vision-text">
            To create a dependable and user-friendly bus transport ecosystem
            that improves communication, planning, and daily travel experiences
            across Canberra.
          </p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="about-panel">
        <div className="section-heading">
          <p className="eyebrow">Testimonials</p>
          <h2>What people say about our platform</h2>
        </div>

        <div className="about-testimonial-grid">
          <div className="about-testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “It makes route access and booking much easier for everyday
              passengers.”
            </p>
            <h4>— John, Passenger</h4>
          </div>

          <div className="about-testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “A simple way to keep track of assignments and daily duty
              information.”
            </p>
            <h4>— Emma, Driver</h4>
          </div>

          <div className="about-testimonial-card">
            <FaStar className="testimonial-star" />
            <p>
              “Very useful for monitoring buses, routes, and user management in
              one place.”
            </p>
            <h4>— Sarah, Administrator</h4>
          </div>
        </div>
      </section>
    </div>
  );
}