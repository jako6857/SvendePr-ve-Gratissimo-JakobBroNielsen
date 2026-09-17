const API_URL = "http://localhost:4000/api";

async function subscribeToNewsletter(email) {
  const response = await fetch(`${API_URL}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    //api'et sender fejlteksten med i svaret, fx { "error": "Email already exists" }
    const data = await response.json();
    throw new Error(data.error);
  }
  return response.json();
}

export { subscribeToNewsletter };
