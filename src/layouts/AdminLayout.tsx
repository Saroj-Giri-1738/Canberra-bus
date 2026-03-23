import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

export default function AdminLayout() {
  return (
    <>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar role="admin" />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
}