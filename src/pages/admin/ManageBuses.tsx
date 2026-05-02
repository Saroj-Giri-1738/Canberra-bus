import { useEffect, useState } from "react";
import "./AdminPages.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaTimes,
  FaSave,
  FaBusAlt,
} from "react-icons/fa";
import {
  addAdminBus,
  deleteAdminBus,
  getAdminBuses,
  updateAdminBus,
  type AdminBus,
} from "../../services/adminApi";

type BusForm = {
  id?: number;
  bus_number: string;
  plate_number: string;
  capacity: string;
  status: "Active" | "Maintenance" | "Inactive";
};

const emptyForm: BusForm = {
  bus_number: "",
  plate_number: "",
  capacity: "40",
  status: "Active",
};

export default function ManageBuses() {
  const [buses, setBuses] = useState<AdminBus[]>([]);
  const [form, setForm] = useState<BusForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadBuses = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getAdminBuses();
      setBuses(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load buses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBuses();
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

  const handleEditClick = (bus: AdminBus) => {
    setForm({
      id: bus.id,
      bus_number: bus.bus_number,
      plate_number: bus.plate_number || "",
      capacity: String(bus.capacity),
      status: bus.status,
    });

    setIsEditing(true);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.bus_number || !form.capacity) {
      alert("Please fill bus number and capacity.");
      return;
    }

    try {
      setSaving(true);

      if (isEditing && form.id) {
        await updateAdminBus({
          id: form.id,
          bus_number: form.bus_number,
          plate_number: form.plate_number || null,
          capacity: Number(form.capacity),
          status: form.status,
          created_at: "",
        });
      } else {
        await addAdminBus({
          bus_number: form.bus_number,
          plate_number: form.plate_number,
          capacity: Number(form.capacity),
          status: form.status,
        });
      }

      await loadBuses();
      resetForm();
    } catch (error: any) {
      alert(error.message || "Failed to save bus");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAdminBus(id);
      await loadBuses();
    } catch (error: any) {
      alert(error.message || "Failed to delete bus");
    }
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Loading buses...</h2>
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
          <button className="admin-btn" onClick={loadBuses}>
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
          <span className="admin-badge">Fleet Management</span>
          <h1>Manage Buses</h1>
          <p>
            Add, update, delete, and monitor buses stored in the MySQL buses
            table.
          </p>
        </div>

        <div className="admin-hero-actions">
          <button className="admin-btn light" onClick={loadBuses}>
            <FaSyncAlt />
            Refresh
          </button>

          <button className="admin-btn light" onClick={handleAddClick}>
            <FaPlus />
            Add Bus
          </button>
        </div>
      </section>

      {showForm && (
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">
                {isEditing ? "Edit Bus" : "New Bus"}
              </span>
              <h2>{isEditing ? "Update Bus Details" : "Add New Bus"}</h2>
            </div>

            <button className="admin-icon-btn" onClick={resetForm}>
              <FaTimes />
            </button>
          </div>

          <form className="admin-form-grid" onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label>Bus Number</label>
              <input
                type="text"
                name="bus_number"
                value={form.bus_number}
                onChange={handleChange}
                placeholder="Example: CB-25"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Plate Number</label>
              <input
                type="text"
                name="plate_number"
                value={form.plate_number}
                onChange={handleChange}
                placeholder="Example: ACT-250"
              />
            </div>

            <div className="admin-input-group">
              <label>Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                placeholder="40"
                min="1"
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn" disabled={saving}>
                <FaSave />
                {saving ? "Saving..." : isEditing ? "Update Bus" : "Save Bus"}
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
            <h2>Bus List</h2>
          </div>

          <strong>{buses.length} buses</strong>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bus Number</th>
                <th>Plate Number</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {buses.length === 0 ? (
                <tr>
                  <td colSpan={7}>No buses found.</td>
                </tr>
              ) : (
                buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.id}</td>
                    <td>
                      <strong>
                        <FaBusAlt style={{ marginRight: "8px" }} />
                        {bus.bus_number}
                      </strong>
                    </td>
                    <td>{bus.plate_number || "N/A"}</td>
                    <td>{bus.capacity}</td>
                    <td>
                      <span
                        className={`admin-status ${
                          bus.status === "Active"
                            ? "admin-status-active"
                            : bus.status === "Maintenance"
                            ? "admin-status-maintenance"
                            : "admin-status-inactive"
                        }`}
                      >
                        {bus.status}
                      </span>
                    </td>
                    <td>
                      {bus.created_at
                        ? new Date(bus.created_at).toLocaleDateString("en-AU")
                        : "N/A"}
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-icon-btn"
                          onClick={() => handleEditClick(bus)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="admin-icon-btn danger"
                          onClick={() => handleDelete(bus.id)}
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