import { useEffect, useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaEdit,
  FaTrash,
  FaSyncAlt,
  FaTimes,
  FaSave,
  FaSearch,
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";
import {
  deleteAdminUser,
  getAdminUsers,
  updateAdminUser,
  type AdminUser,
} from "../../services/adminApi";

type UserForm = {
  id: number;
  full_name: string;
  email: string;
  role: "admin" | "driver" | "passenger";
  phone: string;
};

export default function ManageUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [form, setForm] = useState<UserForm | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "admin" | "driver" | "passenger">("All");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadUsers = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const data = await getAdminUsers();
      setUsers(data);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        user.full_name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        String(user.id).includes(search);

      const matchesRole = roleFilter === "All" || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const userCounts = useMemo(() => {
    return {
      total: users.length,
      admins: users.filter((user) => user.role === "admin").length,
      drivers: users.filter((user) => user.role === "driver").length,
      passengers: users.filter((user) => user.role === "passenger").length,
    };
  }, [users]);

  const handleEditClick = (user: AdminUser) => {
    setForm({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      phone: user.phone || "",
    });

    setShowForm(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!form) return;

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form) return;

    if (!form.full_name || !form.role) {
      alert("Full name and role are required.");
      return;
    }

    try {
      setSaving(true);

      await updateAdminUser({
        id: form.id,
        full_name: form.full_name,
        role: form.role,
        phone: form.phone || null,
      });

      await loadUsers();
      resetForm();
    } catch (error: any) {
      alert(error.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (storedUser?.id === user.id) {
      alert("You cannot delete the account you are currently logged in with.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${user.full_name}?`
    );

    if (!confirmDelete) return;

    try {
      await deleteAdminUser(user.id);
      await loadUsers();
    } catch (error: any) {
      alert(error.message || "Failed to delete user");
    }
  };

  const getRoleIcon = (role: AdminUser["role"]) => {
    if (role === "admin") return <FaUserShield />;
    if (role === "driver") return <FaUserTie />;
    return <FaUsers />;
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-panel">
          <h2>Loading users...</h2>
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
          <button className="admin-btn" onClick={loadUsers}>
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
          <span className="admin-badge">User Management</span>
          <h1>Manage Users</h1>
          <p>
            View, search, update, and manage admin, driver, and passenger
            accounts stored in the MySQL users table.
          </p>
        </div>

        <button className="admin-btn light" onClick={loadUsers}>
          <FaSyncAlt />
          Refresh Users
        </button>
      </section>

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FaUsers />
          </div>
          <div>
            <h3>{userCounts.total}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FaUserShield />
          </div>
          <div>
            <h3>{userCounts.admins}</h3>
            <p>Admins</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FaUserTie />
          </div>
          <div>
            <h3>{userCounts.drivers}</h3>
            <p>Drivers</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">
            <FaUsers />
          </div>
          <div>
            <h3>{userCounts.passengers}</h3>
            <p>Passengers</p>
          </div>
        </div>
      </section>

      {showForm && form && (
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-badge">Edit User</span>
              <h2>Update User Details</h2>
            </div>

            <button className="admin-icon-btn" onClick={resetForm}>
              <FaTimes />
            </button>
          </div>

          <form className="admin-form-grid" onSubmit={handleSubmit}>
            <div className="admin-input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-input-group">
              <label>Email</label>
              <input type="email" value={form.email} disabled />
            </div>

            <div className="admin-input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Optional phone number"
              />
            </div>

            <div className="admin-input-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="passenger">Passenger</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn" disabled={saving}>
                <FaSave />
                {saving ? "Saving..." : "Update User"}
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
            <h2>User List</h2>
          </div>

          <strong>{filteredUsers.length} users shown</strong>
        </div>

        <div className="admin-filter-bar">
          <div className="admin-search-box">
            <FaSearch />
            <input
              type="text"
              placeholder="Search by name, email, or ID"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <select
            className="admin-filter-select"
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(
                event.target.value as "All" | "admin" | "driver" | "passenger"
              )
            }
          >
            <option value="All">All Roles</option>
            <option value="admin">Admins</option>
            <option value="driver">Drivers</option>
            <option value="passenger">Passengers</option>
          </select>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7}>No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <strong>{user.full_name}</strong>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone || "N/A"}</td>
                    <td>
                      <span
                        className={`admin-status ${
                          user.role === "admin"
                            ? "admin-status-admin"
                            : user.role === "driver"
                            ? "admin-status-driver"
                            : "admin-status-passenger"
                        }`}
                      >
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString("en-AU")
                        : "N/A"}
                    </td>
                    <td>
                      <div className="admin-table-actions">
                        <button
                          className="admin-icon-btn"
                          onClick={() => handleEditClick(user)}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="admin-icon-btn danger"
                          onClick={() => handleDelete(user)}
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