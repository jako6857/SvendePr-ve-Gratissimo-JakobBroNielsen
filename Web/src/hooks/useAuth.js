import { useState } from "react";
import { createUser } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:4000/api";

//vi sender email og password til backend/api'et hvor vi får et token tilbage som vi gemmer i localstorage mega vigtig :)

export function useAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  //login funtion som vi bruger i navbar og logind sidn,
  async function login(email, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    });
    if (!response.ok) {
      throw new Error("login fejlede");
    }
    //samt errorhandlig hvis det går i stykker
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);

    navigate("/min-side");
  }

  //og vores logud funktion som også clear brugeren localstorage
  function logout() {
    localStorage.clear();
    setUser(null);
  }

  async function signup(userData) {
    await createUser(userData);
    await login(userData.email, userData.password);
  }

  return { user, login, logout, signup };
}
