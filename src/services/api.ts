const API_BASE_URL = "http://localhost/canberra-bus-backend";

export type UserRole = "admin" | "driver" | "passenger";

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

  localStorage.setItem("user", JSON.stringify(data.user));

  return data.user;
}