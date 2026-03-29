import { mockBuses, mockRoutes } from "../../data/mockData";

export default function ManageBuses() {
  return (
    <>
      <h1>Manage Buses</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Capacity</th>
            <th>Assigned Route</th>
          </tr>
        </thead>
        <tbody>
          {mockBuses.map((bus) => {
            const route = mockRoutes.find((r) => r.id === bus.routeId);

            return (
              <tr key={bus.id}>
                <td>{bus.number}</td>
                <td>{bus.capacity}</td>
                <td>{route?.name || "No Route Assigned"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}