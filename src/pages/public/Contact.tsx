import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaQuestionCircle,
  FaBusAlt,
  FaUserShield,
  FaTicketAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="contact-page">
      {/* HERO */}
      <section className="contact-hero-section">
        <div className="contact-hero-content">
          <p className="eyebrow">Support & enquiries</p>
          <h1>Contact Canberra Bus Company </h1>
          <p className="contact-hero-text">
            Need help with bookings, route information, support requests, or
            general enquiries? Our team is here to help passengers, drivers,
            and administrators.
          </p>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section className="contact-info-grid">
        <div className="contact-info-card">
          <FaEnvelope className="contact-info-icon" />
          <h3>Email Us</h3>
          <p>support@canberrabus.com</p>
        </div>

        <div className="contact-info-card">
          <FaPhoneAlt className="contact-info-icon" />
          <h3>Call Us</h3>
          <p>+61 123 456 789</p>
        </div>

        <div className="contact-info-card">
          <FaMapMarkerAlt className="contact-info-icon" />
          <h3>Visit Us</h3>
          <p>Canberra, ACT, Australia</p>
        </div>

        <div className="contact-info-card">
          <FaClock className="contact-info-icon" />
          <h3>Support Hours</h3>
          <p>Mon - Fri, 8:00 AM - 6:00 PM</p>
        </div>
      </section>

      {/* FORM + SUPPORT PANEL */}
      <section className="contact-main-grid">
        <div className="contact-form-panel">
          <p className="eyebrow">Get in touch</p>
          <h2>Send us a message</h2>
          <p className="contact-panel-text">
            Fill in the form below and our team will get back to you as soon as
            possible.
          </p>

          <form className="contact-form">
            <div className="contact-form-grid">
              <div className="contact-form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" />
              </div>

              <div className="contact-form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter your email address" />
              </div>

              <div className="contact-form-group full-width">
                <label>Subject</label>
                <input type="text" placeholder="Enter message subject" />
              </div>

              <div className="contact-form-group full-width">
                <label>Message</label>
                <textarea
                  placeholder="Write your message here..."
                  rows={6}
                ></textarea>
              </div>
            </div>

            <button type="submit" className="contact-submit-btn">
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-side-panel">
          <div className="contact-help-card">
            <h3>Support Information</h3>
            <div className="contact-help-list">
              <div className="contact-help-item">
                <FaClock />
                <span>Response time: within 24 hours</span>
              </div>
              <div className="contact-help-item">
                <FaQuestionCircle />
                <span>Ticket and booking help available</span>
              </div>
              <div className="contact-help-item">
                <FaBusAlt />
                <span>Route and schedule assistance</span>
              </div>
              <div className="contact-help-item">
                <FaUserShield />
                <span>Admin and driver support services</span>
              </div>
            </div>
          </div>

          <div className="contact-help-card">
            <h3>Common Enquiry Types</h3>
            <div className="contact-enquiry-tags">
              <span>Ticket Booking</span>
              <span>Route Info</span>
              <span>Driver Support</span>
              <span>System Access</span>
              <span>General Enquiry</span>
              <span>Complaints</span>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION + FAQ */}
      <section className="contact-bottom-grid">
        <div className="contact-location-card">
          <p className="eyebrow">Office location</p>
          <h2>Visit our Canberra office</h2>
          <p>
            Canberra Bus Company Support Office
            <br />
            Canberra, ACT, Australia
          </p>

          <div className="location-box">
            <FaMapMarkerAlt className="location-icon" />
            <span>Main support and administration office</span>
          </div>
        </div>

        <div className="contact-faq-card">
          <p className="eyebrow">Need quick help?</p>
          <h2>Frequently asked support topics</h2>

          <div className="faq-list">
            <div className="faq-item">
              <FaTicketAlt />
              <span>How do I book a ticket?</span>
            </div>
            <div className="faq-item">
              <FaBusAlt />
              <span>How do I check the bus schedule?</span>
            </div>
            <div className="faq-item">
              <FaUserShield />
              <span>How do I access driver or admin features?</span>
            </div>
            <div className="faq-item">
              <FaEnvelope />
              <span>How long does support take to respond?</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}