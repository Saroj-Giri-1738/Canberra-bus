const API_BASE_URL = "http://localhost/canberra-bus-backend";

export type PassengerRoute = {
  id: number;
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: string;
  status: "Active" | "Inactive";
  created_at: string;
  stops: string[];
};

export type PassengerBooking = {
  booking_id: number;
  passenger_id: number;
  route_id: number;
  booking_date: string;
  travel_date: string;
  seats: number;
  total_amount: string;
  booking_status: "Booked" | "Cancelled" | "Completed";
  created_at: string;
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: string;
};

function getLoggedInUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    throw new Error("User is not logged in");
  }

  return JSON.parse(user);
}

export function getPassengerId() {
  const user = getLoggedInUser();
  return user.id;
}

async function handleResponse(response: Response) {
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function getPassengerRoutes() {
  const response = await fetch(`${API_BASE_URL}/passenger/routes.php`);
  const data = await handleResponse(response);

  return data.routes as PassengerRoute[];
}

export async function getPassengerBookings() {
  const passengerId = getPassengerId();

  const response = await fetch(
    `${API_BASE_URL}/passenger/bookings.php?passenger_id=${passengerId}`
  );

  const data = await handleResponse(response);

  return data.bookings as PassengerBooking[];
}

export async function createPassengerBooking(booking: {
  route_id: number;
  travel_date: string;
  seats: number;
}) {
  const passengerId = getPassengerId();

  const response = await fetch(`${API_BASE_URL}/passenger/bookings.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      passenger_id: passengerId,
      route_id: booking.route_id,
      travel_date: booking.travel_date,
      seats: booking.seats,
    }),
  });

  return handleResponse(response);
}

export async function updatePassengerBookingStatus(
  bookingId: number,
  status: "Booked" | "Cancelled" | "Completed"
) {
  const passengerId = getPassengerId();

  const response = await fetch(`${API_BASE_URL}/passenger/bookings.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      booking_id: bookingId,
      passenger_id: passengerId,
      status,
    }),
  });

  return handleResponse(response);
}

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

export function formatDate(date: string) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}