export type Role = "passenger" | "driver" | "admin";

export interface User {
  id: string;
  email: string;
  role: Role;
  name: string;
}

export interface Bus {
  id: string;
  number: string;
  capacity: number;
  routeId: string;
}

export interface Route {
  id: string;
  name: string;
  stops: string[];
}

export interface Booking {
  id: string;
  userId: string;
  routeId: string;
  date: string;
  time: string;
}

export interface Attendance {
  id: string;
  driverId: string;
  date: string;
  status: "present" | "absent";
}