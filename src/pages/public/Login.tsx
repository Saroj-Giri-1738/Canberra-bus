import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    const lowerEmail = email.toLowerCase().trim();
    let user;

    if (lowerEmail.includes("passenger")) {
      user = { name: "Passenger User", role: "passenger" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/passenger/dashboard");
    } else if (lowerEmail.includes("driver")) {
      user = { name: "Driver User", role: "driver" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/driver/dashboard");
    } else if (lowerEmail.includes("admin")) {
      user = { name: "Admin User", role: "admin" };
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin/dashboard");
    } else {
      alert("Use an email containing passenger, driver, or admin.");
    }
  };

  return (
    <div className="form-card">
      <h1>Login</h1>
      <p>Use passenger, driver, or admin in the email to test roles.</p>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}