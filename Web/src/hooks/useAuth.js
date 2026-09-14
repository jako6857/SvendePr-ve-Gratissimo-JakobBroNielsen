import { useState } from "react";

const API_URL = "http://localhost:4000/api";

//vi sender email og password til backend/api'et hvor vi får et token tilbage som vi gemmer i localstorage mega vigtig :)

export function useAuth() {
  const [user, setUser] = useState(null);

  async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("login fejlede");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    setUser(data.user);
  }
  return { user, login };
}
