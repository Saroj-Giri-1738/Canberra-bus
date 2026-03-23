import { mockRoutes, mockBuses } from "../../data/mockData";

export default function BusSchedule() {
  return (
    <>
      <h1>Bus Schedule</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Bus Number</th>
            <th>Route Name</th>
            <th>Stops</th>
          </tr>
        </thead>
        <tbody>
          {mockBuses.map((bus) => {
            const route = mockRoutes.find((r) => r.id === bus.routeId);

            return (
              <tr key={bus.id}>
                <td>{bus.number}</td>
                <td>{route?.name || "No Route Assigned"}</td>
                <td>{route ? route.stops.join(" → ") : "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}