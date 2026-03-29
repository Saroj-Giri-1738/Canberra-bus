import { Link, useNavigate } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const rawUser = localStorage.getItem("user");
  const user = rawUser ? JSON.parse(rawUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar">
        <Link to="/" className="brand">
          <FaBusAlt className="brand-icon" />
          <span>Canberra Bus Company</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!user ? (
            <Link to="/login" className="nav-login-btn">
              Login
            </Link>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}