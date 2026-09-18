const API_URL = "http://localhost:4000/api";

async function createUser(userData) {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke oprette bruger");
  }
  return response.json();
}

async function getMyProfile() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Kunne ikke hente profilen");
  }
  //api'et svarer med en liste der kun indeholder én bruger, så vi tager den første
  const users = await response.json();
  return users[0];
}

async function updateMyProfile(userData) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/users`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

export { createUser, getMyProfile, updateMyProfile };
