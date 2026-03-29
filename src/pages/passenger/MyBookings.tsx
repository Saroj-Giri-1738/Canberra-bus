import { mockBookings, mockRoutes, mockUsers } from "../../data/mockData";

export default function MyBookings() {
  return (
    <>
      <h1>My Bookings</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Passenger</th>
            <th>Route</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {mockBookings.map((booking) => {
            const user = mockUsers.find((u) => u.id === booking.userId);
            const route = mockRoutes.find((r) => r.id === booking.routeId);

            return (
              <tr key={booking.id}>
                <td>{user?.name || "Unknown User"}</td>
                <td>{route?.name || "Unknown Route"}</td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}