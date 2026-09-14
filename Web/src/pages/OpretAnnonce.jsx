import { useState, useEffect } from "react";
import { getJobData, createJob } from "../api/jobs.js";

function OpretAnnonce() {
  const { categories, regions, workTypes, loading, error, submitJobForm } =
    usejobForm();

  const [titel, setTitle] = useState("");
  const [beskrivelse, setBeskrivelse] = useState("");
  const [categori, setCategori] = useState("");
  const [region, setRegion] = useState("");
  const [arbejdstype, setArbejdstype] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await submitJobForm({
        titel,
        beskrivelse,
        categori,
        region,
        arbejdstype,
      });
    } catch (error) {
      console.error("Fejl ved oprettelse af job:", error);
    }
  };

  if (loading) {
    return <p>Indlæser...</p>;
  }
  return <form onSubmit={handleSubmit}></form>;
}

export default OpretAnnonce;
