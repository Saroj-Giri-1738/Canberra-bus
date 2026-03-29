export default function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      <div className="cards">
        <div className="card">👥 Manage Users</div>
        <div className="card">🚌 Manage Buses</div>
        <div className="card">📊 Analytics</div>
        <div className="card">⚙ Settings</div>
      </div>
    </div>
  );
}