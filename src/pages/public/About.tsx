import aboutImage from "../../assets/images/bus-stop.png";
import { FaBusAlt, FaUsersCog, FaRoute, FaClipboardList } from "react-icons/fa";

export default function About() {
  return (
    <div className="about-page">
      <section className="about-section">
        <div className="about-text">
          <p className="eyebrow">About our company</p>
          <h1>About Canberra Bus Company</h1>

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
        </div>

        <div className="about-image-wrapper">
          <img
            src={aboutImage}
            alt="Canberra bus service"
            className="about-image"
          />
        </div>
      </section>

      <section className="info-section">
        <div className="section-heading">
          <p className="eyebrow">What we provide</p>
          <h2>Core platform services</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <FaBusAlt className="feature-icon" />
            <h3>Fleet Visibility</h3>
            <p>Track buses, assignments, and availability more efficiently.</p>
          </div>

          <div className="feature-card">
            <FaRoute className="feature-icon" />
            <h3>Route Management</h3>
            <p>Organize route structures and stop details in one system.</p>
          </div>

          <div className="feature-card">
            <FaClipboardList className="feature-icon" />
            <h3>Bookings & Records</h3>
            <p>Maintain travel and attendance data through easy interfaces.</p>
          </div>

          <div className="feature-card">
            <FaUsersCog className="feature-icon" />
            <h3>User Administration</h3>
            <p>Manage passengers, drivers, and admin roles effectively.</p>
          </div>
        </div>
      </section>

      <section className="info-section light-section">
        <h2>Our Vision</h2>
        <p className="section-text">
          To create a dependable and user-friendly bus transport ecosystem that
          improves communication, planning, and daily travel experiences across
          Canberra.
        </p>
      </section>
    </div>
  );
}