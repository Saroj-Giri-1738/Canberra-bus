import { Link, useNavigate } from "react-router-dom";
import { FaBusAlt } from "react-icons/fa";
import { getCurrentUser, clearAllUsers } from "../../services/api";

export default function Navbar() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const dashboardLink = user ? `/${user.role}/dashboard` : "";

  const handleLogout = () => {
    clearAllUsers();
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
          {user ? <Link to={dashboardLink}>Dashboard</Link> : null}
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