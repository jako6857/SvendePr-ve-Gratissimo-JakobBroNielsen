const API_URL = "http://localhost:4000/api";

async function getFavorites() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("kunne ikke hente favoritter");
  }
  return response.json();
}

async function addFavorite(jobListingId) {
  const token = localStorage.getItem("accessToken");
  const body = new URLSearchParams();
  body.set("jobListingId", jobListingId);

  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
    body,
  });
  if (!response.ok) {
    throw new Error("kunne ikke gemme favorit");
  }
  return response.json();
}

async function deleteFavorite(favoriteId) {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${API_URL}/favorites/${favoriteId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("kunne ikke fjerne favorit");
  }
}

export { getFavorites, addFavorite, deleteFavorite };
