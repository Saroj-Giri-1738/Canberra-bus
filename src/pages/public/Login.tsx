import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="auth-page">
      <div className="auth-overlay"></div>

      <div className="auth-wrapper">
        <div className="auth-left">
          <h1>Canberra Bus</h1>
          <p>
            Travel smarter with a modern bus management system for passengers,
            drivers, and administrators.
          </p>

          <div className="auth-features">
            <div className="feature-box">🚌 Real-time Bus Info</div>
            <div className="feature-box">📍 Route Tracking</div>
            <div className="feature-box">🎫 Easy Booking</div>
            <div className="feature-box">⚙️ Smart Dashboard</div>
          </div>
        </div>

        <div className="auth-card">
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="auth-subtitle">
            {isSignup
              ? "Sign up to continue using Canberra Bus"
              : "Login to access your dashboard"}
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            {isSignup && (
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Example: passenger@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="switch-text">
            {isSignup ? "Already have an account?" : "New here?"}
            <span onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? " Login" : " Create an account"}
            </span>
          </p>

          <p className="demo-note">
            Demo roles:
            <br />
            passenger@test.com
            <br />
            driver@test.com
            <br />
            admin@test.com
          </p>
        </div>
      </div>
    </div>
  );
}