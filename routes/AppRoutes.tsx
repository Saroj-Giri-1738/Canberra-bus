import { Routes, Route } from "react-router-dom";
import MainLayout from "../src/layouts/MainLayout";
import PassengerLayout from "../src/layouts/PassengerLayout";
import DriverLayout from "../src/layouts/DriverLayout";
import AdminLayout from "../src/layouts/AdminLayout";
import ProtectedRoute from "../src/components/common/ProtectedRoute";

import Home from "../src/pages/public/Home";
import About from "../src/pages/public/About";
import Contact from "../src/pages/public/Contact";
import Login from "../src/pages/public/Login";

import PassengerDashboard from "../src/pages/passenger/PassengerDashboard";
import BusSchedule from "../src/pages/passenger/BusSchedule";
import BookTicket from "../src/pages/passenger/BookTicket";
import MyBookings from "../src/pages/passenger/MyBookings";

import DriverDashboard from "../src/pages/driver/DriverDashboard";
import AssignedRoutes from "../src/pages/driver/AssignedRoutes";
import Attendance from "../src/pages/driver/Attendance";

import AdminDashboard from "../src/pages/admin/AdminDashboard";
import ManageUsers from "../src/pages/admin/ManageUsers";
import ManageBuses from "../src/pages/admin/ManageBuses";
import ManageRoutes from "../src/pages/admin/ManageRoutes";
import Reports from "../src/pages/admin/Reports";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route
        path="/passenger"
        element={
          <ProtectedRoute allowedRoles={["passenger"]}>
            <PassengerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<PassengerDashboard />} />
        <Route path="schedule" element={<BusSchedule />} />
        <Route path="book-ticket" element={<BookTicket />} />
        <Route path="bookings" element={<MyBookings />} />
      </Route>

      <Route
        path="/driver"
        element={
          <ProtectedRoute allowedRoles={["driver"]}>
            <DriverLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DriverDashboard />} />
        <Route path="routes" element={<AssignedRoutes />} />
        <Route path="attendance" element={<Attendance />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="buses" element={<ManageBuses />} />
        <Route path="routes" element={<ManageRoutes />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;