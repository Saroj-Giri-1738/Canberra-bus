export default function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>

      <div className="card-grid">
        <div className="card">Manage Users</div>
        <div className="card">Manage Buses</div>
        <div className="card">Manage Routes</div>
        <div className="card">View Reports</div>
      </div>
    </>
  );
}