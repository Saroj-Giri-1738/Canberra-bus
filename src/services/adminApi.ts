const API_BASE_URL = "http://localhost/canberra-bus-backend";

export type AdminStats = {
  total_users: number;
  total_drivers: number;
  total_passengers: number;
  total_admins: number;
  total_buses: number;
  active_buses: number;
  maintenance_buses: number;
  total_routes: number;
  active_routes: number;
  total_bookings: number;
  today_assignments: number;
  completed_trips: number;
};

export type AdminRoute = {
  id: number;
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: string;
  status: "Active" | "Inactive";
  created_at: string;
};

export type AdminBus = {
  id: number;
  bus_number: string;
  plate_number: string | null;
  capacity: number;
  status: "Active" | "Maintenance" | "Inactive";
  created_at: string;
};

export type AdminUser = {
  id: number;
  full_name: string;
  email: string;
  role: "admin" | "driver" | "passenger";
  phone: string | null;
  created_at: string;
};

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

/* =========================
   ADMIN DASHBOARD STATS
========================= */

export async function getAdminStats() {
  const response = await fetch(`${API_BASE_URL}/admin/stats.php`);
  const data = await handleResponse(response);

  return data.stats as AdminStats;
}

/* =========================
   ROUTES
========================= */

export async function getAdminRoutes() {
  const response = await fetch(`${API_BASE_URL}/admin/routes.php`);
  const data = await handleResponse(response);

  return data.routes as AdminRoute[];
}

export async function addAdminRoute(route: {
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: number;
  status: "Active" | "Inactive";
}) {
  const response = await fetch(`${API_BASE_URL}/admin/routes.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });

  return handleResponse(response);
}

export async function updateAdminRoute(route: AdminRoute) {
  const response = await fetch(`${API_BASE_URL}/admin/routes.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(route),
  });

  return handleResponse(response);
}

export async function deleteAdminRoute(id: number) {
  const response = await fetch(`${API_BASE_URL}/admin/routes.php?id=${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

/* =========================
   BUSES
========================= */

export async function getAdminBuses() {
  const response = await fetch(`${API_BASE_URL}/admin/buses.php`);
  const data = await handleResponse(response);

  return data.buses as AdminBus[];
}

export async function addAdminBus(bus: {
  bus_number: string;
  plate_number: string;
  capacity: number;
  status: "Active" | "Maintenance" | "Inactive";
}) {
  const response = await fetch(`${API_BASE_URL}/admin/buses.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bus),
  });

  return handleResponse(response);
}

export async function updateAdminBus(bus: AdminBus) {
  const response = await fetch(`${API_BASE_URL}/admin/buses.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bus),
  });

  return handleResponse(response);
}

export async function deleteAdminBus(id: number) {
  const response = await fetch(`${API_BASE_URL}/admin/buses.php?id=${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

/* =========================
   USERS
========================= */

export async function getAdminUsers() {
  const response = await fetch(`${API_BASE_URL}/admin/users.php`);
  const data = await handleResponse(response);

  return data.users as AdminUser[];
}

export async function updateAdminUser(user: {
  id: number;
  full_name: string;
  role: "admin" | "driver" | "passenger";
  phone: string | null;
}) {
  const response = await fetch(`${API_BASE_URL}/admin/users.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return handleResponse(response);
}

export async function deleteAdminUser(id: number) {
  const response = await fetch(`${API_BASE_URL}/admin/users.php?id=${id}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}

/* =========================
   HELPERS
========================= */

export function formatTime(time: string) {
  if (!time) return "N/A";

  const [hours, minutes] = time.split(":");
  const date = new Date();

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));

  return date.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}