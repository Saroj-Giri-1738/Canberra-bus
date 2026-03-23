import { mockRoutes } from "../../data/mockData";

export default function ManageRoutes() {
  return (
    <>
      <h1>Manage Routes</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th>Stops</th>
          </tr>
        </thead>
        <tbody>
          {mockRoutes.map((route) => (
            <tr key={route.id}>
              <td>{route.name}</td>
              <td>{route.stops.join(" → ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}