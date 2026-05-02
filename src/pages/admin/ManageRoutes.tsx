import { useEffect, useState } from "react";
import "./AdminPages.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaTimes,
  FaSave,
} from "react-icons/fa";
import {
  addAdminRoute,
  deleteAdminRoute,
  formatTime,
  getAdminRoutes,
  updateAdminRoute,
  type AdminRoute,
} from "../../services/adminApi";

type RouteForm = {
  id?: number;
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: string;
  status: "Active" | "Inactive";
};

const emptyForm: RouteForm = {
  route_name: "",
  source: "",
  destination: "",
  departure_time: "",
  arrival_time: "",
  fare: "",
  status: "Active",
};

export default function ManageRoutes() {
  const [routes, setRoutes] = useState<AdminRoute[]>([]);
  const [form, setForm] = useState<RouteForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadRoutes = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getAdminRoutes();
      setRoutes(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load routes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleAddClick = () => {
    setForm(emptyForm);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEditClick = (route: AdminRoute) => {
    setForm({
      id: route.id,
      route_name: route.route_name,
      source: route.source,
      destination: route.destination,
      departure_time: route.departure_time,
      arrival_time: route.arrival_time,
      fare: route.fare,
      status: route.status,
    });

    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.route_name ||
      !form.source ||
      !form.destination ||
      !form.departure_time ||
      !form.arrival_time ||
      !form.fare
    ) {
      alert("Please fill all route fields.");
      return;
    }

    try {
      setSaving(true);

      if (isEditing && form.id) {
        await updateAdminRoute({
          id: form.id,
          route_name: form.route_name,
          source: form.source,
          destination: form.destination,
          departure_time: form.departure_time,
          arrival_time: form.arrival_time,
          fare: form.fare,
          status: form.status,
          created_at: "",
        });
      } else {
        await addAdminRoute({
          route_name: form.route_name,
          source: form.source,
          destination: form.destination,
          departure_time: form.departure_time,
          arrival_time: form.arrival_time,
          fare: Number(form.fare),
          status: form.status,
        });
      }

      await loadRoutes();
      resetForm();
    } catch (error: any) {
      alert(error.message || "Failed to save route");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAdminRoute(id);
      await loadRoutes();
    } catch (error: any) {
      alert(error.message || "Failed to delete route");
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Loading routes...</h2>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Something went wrong</h2>
          <p>{errorMessage}</p>
          <button className="admin-btn" onClick={loadRoutes}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <section className="admin-hero">
        <div>
          <span className="admin-badge">Route Management</span>
          <h1>Manage Routes</h1>
          <p>
            Add, update, delete, and monitor bus routes stored in the MySQL
            routes table.
          </p>
        </div>

        <div className="admin-hero-actions">
          <button className="admin-btn light" onClick={loadRoutes}>
            <FaSyncAlt />
            Refresh
          </button>

          <button className="admin-btn light" onClick={handleAddClick}>
            <FaPlus />
            Add Route
          </button>
        </div>
      </section>

      {showForm && (
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">
                {isEditing ? "Edit Route" : "New Route"}
              </span>
              <h2>{isEditing ? "Update Route Details" : "Add New Route"}</h2>
            </div>

            <button className="admin-icon-btn" onClick={resetForm}>
              <FaTimes />
            </button>
          </div>

          <form className="admin-form-grid" onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label>Route Name</label>
              <input
                type="text"
                name="route_name"
                value={form.route_name}
                onChange={handleChange}
                placeholder="Example: City to Belconnen"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Source</label>
              <input
                type="text"
                name="source"
                value={form.source}
                onChange={handleChange}
                placeholder="Example: Canberra City"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Example: Belconnen"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Departure Time</label>
              <input
                type="time"
                name="departure_time"
                value={form.departure_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Arrival Time</label>
              <input
                type="time"
                name="arrival_time"
                value={form.arrival_time}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Fare</label>
              <input
                type="number"
                name="fare"
                value={form.fare}
                onChange={handleChange}
                placeholder="4.50"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn" disabled={saving}>
                <FaSave />
                {saving
                  ? "Saving..."
                  : isEditing
                  ? "Update Route"
                  : "Save Route"}
              </button>

              <button
                type="button"
                className="admin-btn secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <span className="admin-badge">MySQL Data</span>
            <h2>Route List</h2>
          </div>

          <strong>{routes.length} routes</strong>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Route</th>
                <th>From</th>
                <th>To</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Fare</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {routes.length === 0 ? (
                <tr>
                  <td colSpan={9}>No routes found.</td>
                </tr>
              ) : (
                routes.map((route) => (
                  <tr key={route.id}>
                    <td>{route.id}</td>
                    <td>{route.route_name}</td>
                    <td>{route.source}</td>
                    <td>{route.destination}</td>
                    <td>{formatTime(route.departure_time)}</td>
                    <td>{formatTime(route.arrival_time)}</td>
                    <td>${route.fare}</td>
                    <td>
                      <span
                        className={`admin-status ${
                          route.status === "Active"
                            ? "admin-status-active"
                            : "admin-status-inactive"
                        }`}
                      >
                        {route.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-icon-btn"
                          onClick={() => handleEditClick(route)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="admin-icon-btn danger"
                          onClick={() => handleDelete(route.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}