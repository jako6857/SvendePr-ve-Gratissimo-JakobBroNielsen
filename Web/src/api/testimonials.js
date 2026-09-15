const API_URL = "http://localhost:4000/api";

//præcis samme fetch logik som henter job data
async function getTestimonialsData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Kunne ikke hente data fra ${endpoint}`);
  }
  return response.json();
}

export { getTestimonialsData };
