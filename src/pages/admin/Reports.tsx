import { useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaChartBar,
  FaBusAlt,
  FaUsers,
  FaClipboardList,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

type ReportItem = {
  id: number;
  title: string;
  category: "Fleet" | "Users" | "Bookings";
  summary: string;
  lastUpdated: string;
  details: string;
};

export default function Reports() {
  const [reports] = useState<ReportItem[]>([
    {
      id: 1,
      title: "Fleet Performance",
      category: "Fleet",
      summary: "40 buses monitored • 2 maintenance flags",
      lastUpdated: "06 Apr 2026",
      details:
        "This report summarizes bus usage, maintenance alerts, and fleet readiness for the current operational cycle.",
    },
    {
      id: 2,
      title: "User Engagement",
      category: "Users",
      summary: "520 active users • 12% monthly growth",
      lastUpdated: "06 Apr 2026",
      details:
        "This report tracks user growth, new registrations, and engagement trends across passenger, driver, and admin roles.",
    },
    {
      id: 3,
      title: "Booking Summary",
      category: "Bookings",
      summary: "148 bookings today • Peak travel in morning",
      lastUpdated: "06 Apr 2026",
      details:
        "This report highlights daily booking activity, peak travel periods, and route demand based on user reservations.",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ? true : report.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [reports, searchTerm, categoryFilter]);

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Reports</h1>
          <p>View platform summaries, fleet activity, and user engagement reports.</p>
        </div>
      </section>

      <section className="admin-summary-grid">
        <div className="admin-summary-card">
          <h3>74</h3>
          <p>Trips Completed Today</p>
        </div>
        <div className="admin-summary-card">
          <h3>148</h3>
          <p>Bookings Today</p>
        </div>
        <div className="admin-summary-card">
          <h3>40</h3>
          <p>Fleet in System</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <div className="admin-filter-bar">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search reports"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-role-filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Fleet">Fleet</option>
            <option value="Users">Users</option>
            <option value="Bookings">Bookings</option>
          </select>
        </div>

        <h2>Report Overview</h2>
        <p>Recent key reporting indicators for the transport platform.</p>

        <div className="admin-record-list">
          {filteredReports.length === 0 ? (
            <div className="admin-empty-state">
              No reports found for this filter.
            </div>
          ) : (
            filteredReports.map((report) => (
              <div className="admin-record-card" key={report.id}>
                <div className="admin-record-top">
                  <h3>{report.title}</h3>
                  <span className="admin-status-pill admin-role-badge">
                    {report.category}
                  </span>
                </div>

                <div className="admin-record-meta">
                  <span>
                    {report.category === "Fleet" ? (
                      <FaBusAlt />
                    ) : report.category === "Users" ? (
                      <FaUsers />
                    ) : (
                      <FaClipboardList />
                    )}{" "}
                    {report.summary}
                  </span>
                  <span>
                    <FaChartBar /> Updated: {report.lastUpdated}
                  </span>
                </div>

                <div className="admin-action-row">
                  <button
                    className="admin-page-btn"
                    onClick={() => setSelectedReport(report)}
                  >
                    View Report
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedReport && (
        <div
          className="admin-modal-overlay"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Report Details</h2>
              <button
                className="admin-close-btn"
                onClick={() => setSelectedReport(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <strong>Title</strong>
                <span>{selectedReport.title}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Category</strong>
                <span>{selectedReport.category}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Last Updated</strong>
                <span>{selectedReport.lastUpdated}</span>
              </div>
            </div>

            <div className="admin-report-details-box">
              <strong>Summary</strong>
              <p>{selectedReport.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}