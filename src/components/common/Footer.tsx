import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>Canberra Bus Company</h3>
          <p>
            Providing safe, reliable, and modern bus transport services across
            Canberra for passengers, drivers, and administrators.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-list">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Login</li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul className="footer-list">
            <li>Route Scheduling</li>
            <li>Ticket Booking</li>
            <li>Driver Attendance</li>
            <li>Fleet Management</li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><MdEmail /> support@canberrabus.com</li>
            <li><FaPhoneAlt /> +61 123 456 789</li>
            <li><MdLocationOn /> Canberra, ACT, Australia</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-socials">
          <span><FaFacebookF /></span>
          <span><FaInstagram /></span>
          <span><FaLinkedinIn /></span>
        </div>
        <p>© 2026 Canberra Bus Company. All rights reserved.</p>
      </div>
    </footer>
  );
}