import { Link } from "react-router-dom";

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const links = {
    passenger: [
      { to: "/passenger/dashboard", label: "Dashboard" },
      { to: "/passenger/schedule", label: "Bus Schedule" },
      { to: "/passenger/book-ticket", label: "Book Ticket" },
      { to: "/passenger/bookings", label: "My Bookings" },
    ],
    driver: [
      { to: "/driver/dashboard", label: "Dashboard" },
      { to: "/driver/routes", label: "Assigned Routes" },
      { to: "/driver/attendance", label: "Attendance" },
    ],
    admin: [
      { to: "/admin/dashboard", label: "Dashboard" },
      { to: "/admin/users", label: "Manage Users" },
      { to: "/admin/buses", label: "Manage Buses" },
      { to: "/admin/routes", label: "Manage Routes" },
      { to: "/admin/reports", label: "Reports" },
    ],
  };

  return (
    <aside className="sidebar">
      <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Menu</h3>
      <ul>
        {links[role as keyof typeof links]?.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;