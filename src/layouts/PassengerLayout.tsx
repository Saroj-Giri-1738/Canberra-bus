import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

export default function PassengerLayout() {
  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar role="passenger" />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}