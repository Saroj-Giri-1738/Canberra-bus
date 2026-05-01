export type DriverRouteStatus = "Confirmed" | "In Progress" | "Completed" | "Pending";

export type DriverRoute = {
  id: string;
  routeName: string;
  source: string;
  destination: string;
  stops: string[];
  departureTime: string;
  arrivalTime: string;
  busNumber: string;
  platform: string;
  status: DriverRouteStatus;
  inspectionDone: boolean;
};

export type AttendanceStatus = "Present" | "Absent";

export type DriverAttendance = {
  date: string;
  status: AttendanceStatus;
  markedAt: string;
};

const ROUTES_KEY = "cbc_driver_routes";
const ATTENDANCE_KEY = "cbc_driver_attendance";

export const todayISO = () => new Date().toISOString().slice(0, 10);

export const formatToday = () =>
  new Date().toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const defaultDriverRoutes: DriverRoute[] = [
  {
    id: "DR-1001",
    routeName: "Canberra City → Belconnen",
    source: "Canberra City",
    destination: "Belconnen",
    stops: ["Canberra City", "ANU", "Bruce", "Belconnen"],
    departureTime: "08:30 AM",
    arrivalTime: "09:20 AM",
    busNumber: "CB-12",
    platform: "Platform 3",
    status: "Confirmed",
    inspectionDone: false,
  },
  {
    id: "DR-1002",
    routeName: "ANU → Civic",
    source: "ANU",
    destination: "Civic",
    stops: ["ANU", "Acton", "City West", "Civic"],
    departureTime: "10:00 AM",
    arrivalTime: "10:25 AM",
    busNumber: "CB-08",
    platform: "Platform 1",
    status: "Pending",
    inspectionDone: false,
  },
  {
    id: "DR-1003",
    routeName: "Woden → Airport",
    source: "Woden",
    destination: "Airport",
    stops: ["Woden", "Fyshwick", "Majura Park", "Airport"],
    departureTime: "12:15 PM",
    arrivalTime: "01:05 PM",
    busNumber: "CB-15",
    platform: "Platform 2",
    status: "Confirmed",
    inspectionDone: true,
  },
  {
    id: "DR-1004",
    routeName: "Gungahlin → City",
    source: "Gungahlin",
    destination: "Canberra City",
    stops: ["Gungahlin", "Dickson", "Braddon", "Canberra City"],
    departureTime: "03:45 PM",
    arrivalTime: "04:30 PM",
    busNumber: "CB-20",
    platform: "Platform 4",
    status: "Confirmed",
    inspectionDone: false,
  },
];

const readJSON = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = <T,>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getDriverRoutes = () => {
  const routes = readJSON<DriverRoute[]>(ROUTES_KEY, defaultDriverRoutes);
  writeJSON(ROUTES_KEY, routes);
  return routes;
};

export const saveDriverRoutes = (routes: DriverRoute[]) => {
  writeJSON(ROUTES_KEY, routes);
};

export const updateDriverRoute = (
  routeId: string,
  changes: Partial<DriverRoute>
) => {
  const updatedRoutes = getDriverRoutes().map((route) =>
    route.id === routeId ? { ...route, ...changes } : route
  );

  saveDriverRoutes(updatedRoutes);
  return updatedRoutes;
};

export const resetDriverRoutes = () => {
  saveDriverRoutes(defaultDriverRoutes);
  return defaultDriverRoutes;
};

export const getAttendanceHistory = () =>
  readJSON<DriverAttendance[]>(ATTENDANCE_KEY, []);

export const getTodayAttendance = () => {
  const today = todayISO();
  return getAttendanceHistory().find((item) => item.date === today) || null;
};

export const markTodayAttendance = (status: AttendanceStatus) => {
  const today = todayISO();

  const attendance: DriverAttendance = {
    date: today,
    status,
    markedAt: new Date().toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const withoutToday = getAttendanceHistory().filter(
    (item) => item.date !== today
  );

  const updatedHistory = [attendance, ...withoutToday];

  writeJSON(ATTENDANCE_KEY, updatedHistory);

  return attendance;
};