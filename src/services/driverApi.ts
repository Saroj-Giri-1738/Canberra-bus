const API_BASE_URL = "http://localhost/canberra-bus-backend";

export type DriverAssignment = {
  assignment_id: number;
  driver_id: number;
  assignment_date: string;
  assignment_status:
    | "Pending"
    | "Confirmed"
    | "In Progress"
    | "Completed"
    | "Cancelled";
  inspection_done: number;
  route_id: number;
  route_name: string;
  source: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  fare: string;
  route_status: string;
  bus_id: number;
  bus_number: string;
  plate_number: string;
  capacity: number;
  bus_status: string;
  stops: string[];
};

export type AttendanceRecord = {
  id: number;
  driver_id: number;
  attendance_date: string;
  status: "Present" | "Absent";
  marked_at: string;
};

function getLoggedInUser() {
  const user = localStorage.getItem("user");

  if (!user) {
    throw new Error("User is not logged in");
  }

  return JSON.parse(user);
}

export function getDriverId() {
  const user = getLoggedInUser();
  return user.id;
}

export async function getDriverAssignments() {
  const driverId = getDriverId();

  const response = await fetch(
    `${API_BASE_URL}/driver/assignments.php?driver_id=${driverId}`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load driver assignments");
  }

  return data.assignments as DriverAssignment[];
}

export async function updateDriverAssignment(
  assignmentId: number,
  updates: {
    status?: DriverAssignment["assignment_status"];
    inspection_done?: boolean;
  }
) {
  const response = await fetch(
    `${API_BASE_URL}/driver/update-assignment.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignment_id: assignmentId,
        ...updates,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to update assignment");
  }

  return data;
}

export async function getDriverAttendance() {
  const driverId = getDriverId();

  const response = await fetch(
    `${API_BASE_URL}/driver/attendance.php?driver_id=${driverId}`
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to load attendance");
  }

  return {
    today: data.today as AttendanceRecord | null,
    history: data.history as AttendanceRecord[],
  };
}

export async function markDriverAttendance(status: "Present" | "Absent") {
  const driverId = getDriverId();

  const response = await fetch(`${API_BASE_URL}/driver/attendance.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      driver_id: driverId,
      status,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to save attendance");
  }

  return data;
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