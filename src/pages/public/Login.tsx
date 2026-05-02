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
import { loginUser, registerUser, type UserRole } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("passenger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      if (isSignup) {
        if (!fullName.trim()) {
          throw new Error("Please enter your full name.");
        }

        await registerUser(fullName, email, password, role);

        alert("Account created successfully. Please login now.");

        setIsSignup(false);
        setFullName("");
        setEmail("");
        setPassword("");
        setRole("passenger");
      } else {
        const user = await loginUser(email, password);

        navigate(`/${user.role}/dashboard`);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
                <p>
                  Stay updated with routes, schedules, and daily travel details.
                </p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaMapMarkedAlt className="login-feature-icon" />
              <div>
                <h3>Route Tracking</h3>
                <p>
                  Find routes and stops quickly with a clear system layout.
                </p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaTicketAlt className="login-feature-icon" />
              <div>
                <h3>Easy Booking</h3>
                <p>
                  Passengers can book and manage travel from one place.
                </p>
              </div>
            </div>

            <div className="login-feature-item">
              <FaUserShield className="login-feature-icon" />
              <div>
                <h3>Role-Based Access</h3>
                <p>
                  Dedicated tools for passengers, drivers, and admins.
                </p>
              </div>
            </div>
          </div>

          <div className="login-demo-roles">
            <span>Available roles:</span>
            <div className="role-pills">
              <span>Passenger</span>
              <span>Driver</span>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className="login-card">
          <div className="login-card-top">
            <p className="eyebrow">
              {isSignup ? "Create account" : "Welcome back"}
            </p>

            <h2>
              {isSignup ? "Join Canberra Bus" : "Login to your account"}
            </h2>

            <p className="login-card-subtitle">
              {isSignup
                ? "Create your account to access passenger, driver, or admin services."
                : "Access your dashboard and continue managing your travel or operations."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {isSignup && (
              <>
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

                <div className="login-input-group">
                  <label>Account Type</label>
                  <div className="login-input-wrap">
                    <FaUserShield className="login-input-icon" />

                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      required
                      className="login-role-select"
                    >
                      <option value="passenger">Passenger</option>
                      <option value="driver">Driver</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              </>
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
                  minLength={6}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="login-error-box">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Login"}

              <FaArrowRight />
            </button>
          </form>

          <div className="login-switch-box">
            <p>
              {isSignup ? "Already have an account?" : "New here?"}

              <span
                onClick={() => {
                  setIsSignup(!isSignup);
                  setErrorMessage("");
                  setPassword("");
                }}
              >
                {isSignup ? " Login" : " Create an account"}
              </span>
            </p>
          </div>

          <div className="login-help-box">
            <h4>How to test</h4>
            <p>Create accounts first, then login using the same details.</p>

            <ul>
              <li>Create a Passenger account</li>
              <li>Create a Driver account</li>
              <li>Create an Admin account</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}