const API_BASE_URL = "http://localhost/canberra-bus-backend";

export type UserRole = "admin" | "driver" | "passenger";

export type AuthUser = {
  id: number;
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string;
};

function getUserStorageKey(role?: string): string {
  if (!role) {
    const user = getCurrentUser();
    return user ? `user_${user.role}` : "user";
  }
  return `user_${role}`;
}

export function getCurrentUser(): AuthUser | null {
  const keys = ["user_admin", "user_driver", "user_passenger"];

  for (const key of keys) {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        return JSON.parse(stored) as AuthUser;
      } catch {
        localStorage.removeItem(key);
      }
    }
  }

  return null;
}

export function clearAllUsers(): void {
  ["user_admin", "user_driver", "user_passenger"].forEach((key) => {
    localStorage.removeItem(key);
  });
}

export async function registerUser(
  fullName: string,
  email: string,
  password: string,
  role: UserRole,
  phone?: string
) {
  const response = await fetch(`${API_BASE_URL}/auth/register.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      full_name: fullName,
      email,
      password,
      role,
      phone,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Login failed");
  }

  const user = data.user as AuthUser;
  localStorage.setItem(getUserStorageKey(user.role), JSON.stringify(user));

  return user;
}