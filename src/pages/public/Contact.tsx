import { MdEmail, MdLocationOn } from "react-icons/md";
import { FaPhoneAlt, FaClock } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <p className="eyebrow">Get in touch</p>
        <h1>Contact Canberra Bus Company</h1>
        <p className="section-text">
          We are here to help passengers, drivers, and administrators with any
          questions related to routes, bookings, support, and transport
          services.
        </p>
      </section>

      <div className="feature-grid">
        <div className="feature-card">
          <MdEmail className="feature-icon" />
          <h3>Email Address</h3>
          <p>support@canberrabus.com</p>
        </div>

        <div className="feature-card">
          <FaPhoneAlt className="feature-icon" />
          <h3>Phone Number</h3>
          <p>+61 123 456 789</p>
        </div>

        <div className="feature-card">
          <MdLocationOn className="feature-icon" />
          <h3>Office Location</h3>
          <p>Canberra, ACT, Australia</p>
        </div>

        <div className="feature-card">
          <FaClock className="feature-icon" />
          <h3>Support Hours</h3>
          <p>Mon–Fri: 8:00 AM – 6:00 PM</p>
        </div>
      </div>

      <section className="info-section">
        <h2>Support Information</h2>
        <p className="section-text">
          For passenger inquiries, booking support, route details, and service
          updates, please contact our support team during working hours. Driver
          and admin support requests can also be directed through the same
          communication channels.
        </p>
      </section>
    </div>
  );
}