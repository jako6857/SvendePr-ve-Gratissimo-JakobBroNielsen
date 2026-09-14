const API_URL = "http://localhost:4000/api";

//herinde laver vi flowet som kan oprette et job samt vise hvilken data der kommer fra api'ets job sektion

async function getJobData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`kunne ikke hente data fra ${endpoint}`);
  }
  return response.json();
}

async function createJob(jobData) {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error("Kunne ikke oprette job");
  }
  return response.json();
}

export { getJobData, createJob };
