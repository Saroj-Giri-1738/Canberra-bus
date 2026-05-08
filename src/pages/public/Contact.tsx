import { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaClock,
  FaQuestionCircle,
  FaBusAlt,
  FaUserShield,
} from "react-icons/fa";
import { submitContactMessage } from "../../services/passengerApi";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      alert("Please fill all contact form fields.");
      return;
    }

    try {
      setLoading(true);

      await submitContactMessage({
        full_name: fullName,
        email,
        subject,
        message,
      });

      alert("Message sent successfully. Admin can now view it in Reports.");

      setFullName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error: any) {
      alert(error.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div>
          <span className="contact-badge">Contact Us</span>
          <h1>Get in touch with Canberra Bus Company</h1>
          <p>
            Have a question, complaint, feedback, or support request? Send us a
            message and our team will review it.
          </p>
        </div>
      </section>

      <section className="contact-info-grid">
        <div className="contact-info-card">
          <div className="contact-info-icon">
            <FaEnvelope />
          </div>
          <h3>Email Us</h3>
          <p>support@canberrabus.com</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon">
            <FaPhoneAlt />
          </div>
          <h3>Call Us</h3>
          <p>+61 123 456 789</p>
        </div>

        <div className="contact-info-card">
          <div className="contact-info-icon">
            <FaMapMarkerAlt />
          </div>
          <h3>Visit Us</h3>
          <p>Canberra, ACT, Australia</p>
        </div>
      </section>

      <section className="contact-content-grid">
        <div className="contact-form-card">
          <span className="contact-section-label">Get in touch</span>
          <h2>Send us a message</h2>
          <p>
            Fill in the form below and our team will get back to you as soon as
            possible.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <div className="contact-input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="contact-input-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="contact-input-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Enter message subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Message</label>
              <textarea
                placeholder="Write your message here..."
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button className="contact-submit-btn" type="submit" disabled={loading}>
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="contact-side-panel">
          <div className="contact-support-card">
            <h3>Support Topics</h3>

            <div className="contact-support-item">
              <FaClock />
              <span>Route and schedule enquiries</span>
            </div>

            <div className="contact-support-item">
              <FaQuestionCircle />
              <span>Ticket booking support</span>
            </div>

            <div className="contact-support-item">
              <FaBusAlt />
              <span>Route or bus service issues</span>
            </div>

            <div className="contact-support-item">
              <FaUserShield />
              <span>Admin or account support</span>
            </div>
          </div>

          <div className="contact-support-card">
            <h3>Common Requests</h3>

            <div className="contact-pill-list">
              <span>Ticket Issue</span>
              <span>Driver Support</span>
              <span>General Feedback</span>
              <span>Route Complaint</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}