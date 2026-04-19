import { useMemo, useState } from "react";
import "./AdminPages.css";
import {
  FaUsers,
  FaUserShield,
  FaIdBadge,
  FaSearch,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTimes,
  FaSave,
  FaUserEdit,
} from "react-icons/fa";

type User = {
  id: number;
  name: string;
  role: "Passenger" | "Driver" | "Admin";
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
  status: "Active" | "Pending";
};

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "John Passenger",
      role: "Passenger",
      email: "passenger@test.com",
      phone: "+61 401 111 111",
      address: "Canberra City, ACT",
      joinedDate: "01 Apr 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Emma Driver",
      role: "Driver",
      email: "driver@test.com",
      phone: "+61 402 222 222",
      address: "Belconnen, ACT",
      joinedDate: "03 Apr 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Sarah Admin",
      role: "Admin",
      email: "admin@test.com",
      phone: "+61 403 333 333",
      address: "Civic, ACT",
      joinedDate: "05 Apr 2026",
      status: "Pending",
    },
    {
      id: 4,
      name: "Michael Passenger",
      role: "Passenger",
      email: "michael@test.com",
      phone: "+61 404 444 444",
      address: "Gungahlin, ACT",
      joinedDate: "06 Apr 2026",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole =
        roleFilter === "All" ? true : user.role === roleFilter;

      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, roleFilter]);

  const handleEditChange = (
    field: keyof User,
    value: string
  ) => {
    if (!editUser) return;
    setEditUser({ ...editUser, [field]: value } as User);
  };

  const handleSaveUser = () => {
    if (!editUser) return;

    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? editUser : user
    );

    setUsers(updatedUsers);
    setEditUser(null);
  };

  return (
    <div className="admin-page">
      <section className="admin-page-hero">
        <div>
          <span className="admin-page-badge">Admin Services</span>
          <h1>Manage Users</h1>
          <p>Track platform accounts and role-based access across the system.</p>
        </div>
      </section>

      <section className="admin-page-panel">
        <div className="admin-filter-bar">
          <div className="admin-search-box">
            <FaSearch className="admin-search-icon" />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-role-filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Passenger">Passenger</option>
            <option value="Driver">Driver</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <h2>User Directory</h2>
        <p>Review user roles and account information below.</p>

        <div className="admin-record-list">
          {filteredUsers.length === 0 ? (
            <div className="admin-empty-state">No users found for this filter.</div>
          ) : (
            filteredUsers.map((user) => (
              <div className="admin-record-card" key={user.id}>
                <div className="admin-record-top">
                  <h3>{user.name}</h3>

                  <div className="admin-user-badges">
                    <span
                      className={`admin-status-pill ${
                        user.status === "Active"
                          ? "admin-status-active"
                          : "admin-status-warning"
                      }`}
                    >
                      {user.status}
                    </span>

                    <span className="admin-status-pill admin-role-badge">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="admin-record-meta">
                  <span><FaUsers /> {user.email}</span>
                  <span>
                    {user.role === "Driver" ? <FaIdBadge /> : <FaUserShield />}{" "}
                    {user.role} Access
                  </span>
                </div>

                <div className="admin-action-row">
                  <button
                    className="admin-page-btn"
                    onClick={() => setEditUser(user)}
                  >
                    <FaUserEdit />
                    Edit User
                  </button>

                  <button
                    className="admin-page-btn secondary"
                    onClick={() => setSelectedUser(user)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setSelectedUser(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>User Profile</h2>
              <button
                className="admin-close-btn"
                onClick={() => setSelectedUser(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-profile-grid">
              <div className="admin-profile-item">
                <strong>Name</strong>
                <span>{selectedUser.name}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Role</strong>
                <span>{selectedUser.role}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Email</strong>
                <span>{selectedUser.email}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Phone</strong>
                <span>{selectedUser.phone}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Address</strong>
                <span>{selectedUser.address}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Joined Date</strong>
                <span>{selectedUser.joinedDate}</span>
              </div>
              <div className="admin-profile-item">
                <strong>Status</strong>
                <span>{selectedUser.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {editUser && (
        <div className="admin-modal-overlay" onClick={() => setEditUser(null)}>
          <div
            className="admin-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal-header">
              <h2>Edit User</h2>
              <button
                className="admin-close-btn"
                onClick={() => setEditUser(null)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="admin-edit-form">
              <label>Name</label>
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => handleEditChange("name", e.target.value)}
              />

              <label>Email</label>
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => handleEditChange("email", e.target.value)}
              />

              <label>Phone</label>
              <input
                type="text"
                value={editUser.phone}
                onChange={(e) => handleEditChange("phone", e.target.value)}
              />

              <label>Address</label>
              <input
                type="text"
                value={editUser.address}
                onChange={(e) => handleEditChange("address", e.target.value)}
              />

              <label>Role</label>
              <select
                value={editUser.role}
                onChange={(e) =>
                  handleEditChange("role", e.target.value as User["role"])
                }
              >
                <option value="Passenger">Passenger</option>
                <option value="Driver">Driver</option>
                <option value="Admin">Admin</option>
              </select>

              <label>Status</label>
              <select
                value={editUser.status}
                onChange={(e) =>
                  handleEditChange("status", e.target.value as User["status"])
                }
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
              </select>

              <button className="admin-page-btn" onClick={handleSaveUser}>
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