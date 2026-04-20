import { useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaBusAlt,
  FaCheckCircle,
  FaTools,
  FaSearch,
  FaTimes,
  FaSave,
  FaMapMarkedAlt,
  FaUsers,
} from "react-icons/fa";

type Bus = {
  id: number;
  busNumber: string;
  route: string;
  capacity: number;
  driver: string;
  status: "Active" | "Maintenance" | "Inactive";
};

export default function ManageBuses() {
  const [buses, setBuses] = useState<Bus[]>([
    {
      id: 1,
      busNumber: "CB-12",
      route: "Canberra City → Belconnen",
      capacity: 45,
      driver: "Emma Driver",
      status: "Active",
    },
    {
      id: 2,
      busNumber: "CB-08",
      route: "ANU → Civic",
      capacity: 38,
      driver: "David Smith",
      status: "Maintenance",
    },
    {
      id: 3,
      busNumber: "CB-15",
      route: "Woden → Airport",
      capacity: 50,
      driver: "Michael Lee",
      status: "Active",
    },
    {
      id: 4,
      busNumber: "CB-20",
      route: "Gungahlin → City",
      capacity: 42,
      driver: "Sophia Brown",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [editBus, setEditBus] = useState<Bus | null>(null);

  const filteredBuses = useMemo(() => {
    return buses.filter((bus) => {
      const matchesSearch =
        bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.route.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.driver.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : bus.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [buses, searchTerm, statusFilter]);

  const handleEditChange = (field: keyof Bus, value: string | number) => {
    if (!editBus) return;
    setEditBus({ ...editBus, [field]: value } as Bus);
  };

  const handleSaveBus = () => {
    if (!editBus) return;

    const updatedBuses = buses.map((bus) =>
      bus.id === editBus.id ? editBus : bus
    );

    setBuses(updatedBuses);
    setEditBus(null);
  };

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Buses</h1>
          <p>Review fleet status, assignments, and operational readiness.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <div className="admin-filter-bar">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by bus, route, or driver"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-role-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <h2>Fleet Overview</h2>
        <p>Current buses and system status are listed below.</p>

        <div className="admin-record-list">
          {filteredBuses.length === 0 ? (
            <div className="admin-empty-state">No buses found for this filter.</div>
          ) : (
            filteredBuses.map((bus) => (
              <div className="admin-record-card" key={bus.id}>
                <div className="admin-record-top">
                  <h3>Bus No. {bus.busNumber}</h3>

                  <span
                    className={`admin-status-pill ${
                      bus.status === "Active"
                        ? "admin-status-active"
                        : bus.status === "Maintenance"
                        ? "admin-status-warning"
                        : "admin-status-inactive"
                    }`}
                  >
                    {bus.status}
                  </span>
                </div>

                <div className="admin-record-meta">
                  <span>
                    <FaMapMarkedAlt /> {bus.route}
                  </span>
                  <span>
                    <FaUsers /> Capacity: {bus.capacity}
                  </span>
                  <span>
                    <FaBusAlt /> Driver: {bus.driver}
                  </span>
                </div>

                <div className="admin-action-row">
                  <button
                    className="admin-page-btn"
                    onClick={() => setEditBus(bus)}
                  >
                    <FaCheckCircle />
                    Edit Bus
                  </button>

                  <button
                    className="admin-page-btn secondary"
                    onClick={() => setSelectedBus(bus)}
                  >
                    <FaTools />
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedBus && (
        <div className="admin-modal-overlay" onClick={() => setSelectedBus(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Bus Details</h2>
              <button
                className="admin-close-btn"
                onClick={() => setSelectedBus(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <strong>Bus Number</strong>
                <span>{selectedBus.busNumber}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Status</strong>
                <span>{selectedBus.status}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Route</strong>
                <span>{selectedBus.route}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Capacity</strong>
                <span>{selectedBus.capacity}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Assigned Driver</strong>
                <span>{selectedBus.driver}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {editBus && (
        <div className="admin-modal-overlay" onClick={() => setEditBus(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Edit Bus</h2>
              <button
                className="admin-close-btn"
                onClick={() => setEditBus(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-edit-form">
              <label>Bus Number</label>
              <input
                type="text"
                value={editBus.busNumber}
                onChange={(e) => handleEditChange("busNumber", e.target.value)}
              />

              <label>Route</label>
              <input
                type="text"
                value={editBus.route}
                onChange={(e) => handleEditChange("route", e.target.value)}
              />

              <label>Capacity</label>
              <input
                type="number"
                value={editBus.capacity}
                onChange={(e) =>
                  handleEditChange("capacity", Number(e.target.value))
                }
              />

              <label>Driver</label>
              <input
                type="text"
                value={editBus.driver}
                onChange={(e) => handleEditChange("driver", e.target.value)}
              />

              <label>Status</label>
              <select
                value={editBus.status}
                onChange={(e) =>
                  handleEditChange("status", e.target.value as Bus["status"])
                }
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button className="admin-page-btn" onClick={handleSaveBus}>
                <FaSave />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}