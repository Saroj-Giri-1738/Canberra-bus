import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBusAlt,
  FaMapMarkedAlt,
  FaTicketAlt,
  FaUserShield,
  FaArrowRight,
  FaEnvelope,
  FaLock,
  FaUser,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();

    let role = "passenger";
    if (lowerEmail.includes("driver")) role = "driver";
    if (lowerEmail.includes("admin")) role = "admin";

    const user = {
      fullName,
      email,
      role,
    };

    localStorage.setItem("user", JSON.stringify(user));
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-left">
          <span className="login-badge">Smart Transport Platform</span>

          <h1>Welcome to Canberra Bus Company</h1>
          <p className="login-lead">
            A modern bus management platform designed for passengers, drivers,
            and administrators across Canberra.
          </p>

          <div className="login-feature-list">
            <div className="login-feature-item">
              <FaBusAlt className="login-feature-icon" />
              <div>
                <h3>Real-Time Bus Info</h3>
                <p>Stay updated with routes, schedules, and daily travel details.</p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaMapMarkedAlt className="login-feature-icon" />
              <div>
                <h3>Route Tracking</h3>
                <p>Find routes and stops quickly with a clear system layout.</p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaTicketAlt className="login-feature-icon" />
              <div>
                <h3>Easy Booking</h3>
                <p>Passengers can book and manage travel from one place.</p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaUserShield className="login-feature-icon" />
              <div>
                <h3>Role-Based Access</h3>
                <p>Dedicated tools for passengers, drivers, and admins.</p>
              </div>
            </div>
          </div>

          <div className="login-demo-roles">
            <span>Demo roles:</span>
            <div className="role-pills">
              <span>passenger@test.com</span>
              <span>driver@test.com</span>
              <span>admin@test.com</span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <p className="eyebrow">{isSignup ? "Create account" : "Welcome back"}</p>
            <h2>{isSignup ? "Join Canberra Bus" : "Login to your account"}</h2>
            <p className="login-card-subtitle">
              {isSignup
                ? "Create your account to access passenger, driver, or admin services."
                : "Access your dashboard and continue managing your travel or operations."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <div className="login-input-group">
                <label>Full Name</label>
                <div className="login-input-wrap">
                  <FaUser className="login-input-icon" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="login-input-group">
              <label>Email</label>
              <div className="login-input-wrap">
                <FaEnvelope className="login-input-icon" />
                <input
                  type="email"
                  placeholder="Example: passenger@test.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div className="login-input-wrap">
                <FaLock className="login-input-icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit-btn">
              {isSignup ? "Create Account" : "Login"}
              <FaArrowRight />
            </button>
          </form>

          <div className="login-switch-box">
            <p>
              {isSignup ? "Already have an account?" : "New here?"}
              <span onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? " Login" : " Create an account"}
              </span>
            </p>
          </div>

          <div className="login-help-box">
            <h4>Quick test access</h4>
            <p>Use the email role keywords to open different dashboards.</p>
            <ul>
              <li>Passenger → passenger@test.com</li>
              <li>Driver → driver@test.com</li>
              <li>Admin → admin@test.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}