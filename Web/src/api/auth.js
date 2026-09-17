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

export { createUser };
