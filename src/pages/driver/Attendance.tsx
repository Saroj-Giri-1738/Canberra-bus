import { mockAttendance } from "../../data/mockData";

export default function Attendance() {
  const handleAttendance = () => {
    alert("Attendance marked successfully.");
  };

  return (
    <>
      <h1>Attendance</h1>
      <p>Click the button below to mark your attendance for today.</p>

      <button className="primary-btn" onClick={handleAttendance}>
        Mark Attendance
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockAttendance.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}