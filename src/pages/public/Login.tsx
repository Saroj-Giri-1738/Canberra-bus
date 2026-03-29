import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase();

    let role = "passenger";
    if (lowerEmail.includes("driver")) role = "driver";
    if (lowerEmail.includes("admin")) role = "admin";

    const user = { email, role };
    localStorage.setItem("user", JSON.stringify(user));

    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input type="text" placeholder="Full Name" required />
          )}

          <input
            type="email"
            placeholder="Email (use passenger/driver/admin)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p>
          {isSignup ? "Already have an account?" : "New user?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Login" : " Sign up"}
          </span>
        </p>
      </div>
    </div>
  );
}