import type { User, Bus, Route, Booking, Attendance } from "../../types";

export const mockUsers: User[] = [
  {
    id: "1",
    email: "passenger@test.com",
    role: "passenger",
    name: "John Passenger",
  },
  {
    id: "2",
    email: "driver@test.com",
    role: "driver",
    name: "Jane Driver",
  },
  {
    id: "3",
    email: "admin@test.com",
    role: "admin",
    name: "Admin User",
  },
];

export const mockRoutes: Route[] = [
  {
    id: "1",
    name: "Canberra City to Belconnen",
    stops: ["Canberra City", "ANU", "Bruce", "Belconnen"],
  },
  {
    id: "2",
    name: "Canberra City to Gungahlin",
    stops: ["Canberra City", "Dickson", "Franklin", "Gungahlin"],
  },
  {
    id: "3",
    name: "Woden to Airport",
    stops: ["Woden", "Fyshwick", "Airport"],
  },
];

export const mockBuses: Bus[] = [
  {
    id: "1",
    number: "BUS-101",
    capacity: 40,
    routeId: "1",
  },
  {
    id: "2",
    number: "BUS-102",
    capacity: 35,
    routeId: "2",
  },
  {
    id: "3",
    number: "BUS-103",
    capacity: 45,
    routeId: "3",
  },
];

export const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    routeId: "1",
    date: "2026-03-22",
    time: "08:00 AM",
  },
  {
    id: "2",
    userId: "1",
    routeId: "3",
    date: "2026-03-23",
    time: "10:00 AM",
  },
];

export const mockAttendance: Attendance[] = [
  {
    id: "1",
    driverId: "2",
    date: "2026-03-22",
    status: "present",
  },
];