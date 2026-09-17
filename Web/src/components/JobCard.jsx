import { useState } from "react";
import { addFavorite, deleteFavorite } from "../api/favorites";
import "../scss/JobCard.scss";

function JobCard({ job, onOpen, user }) {
  const [saved, setSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  async function handleSave() {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    try {
      await addFavorite(job.id);
      setSaved(true);
    } catch (error) {
      console.error("Fejl ved gemme favorit:", error);
    }
  }
  return (
    <div className="job-card">
      <div>
        <p className="organization">{job.organization}</p>
        <h2>{job.title}</h2>
        <p>{job.description}</p>
      </div>

      <div>
        <p>Lokation: {job.city}</p>
        <p>Indrykket: {new Date(job.createdAt).toLocaleDateString("da-DK")}</p>

        <div className="actions">
          <button className="button-Container" onClick={handleSave}>
            {saved ? "Fjern" : "Gem"}
            <img
              src={saved ? "/HeartFilled.png" : "/Heart.png"}
              alt="gem knap hjerteform"
              className="button-icon"
            />
          </button>
          <button onClick={() => onOpen(job.id)}>Åben</button>
        </div>
      </div>

      {showLoginModal && (
        <div className="login-modal">
          <p>Du skal være logget ind for at gemme en favorit.</p>
        </div>
      )}
    </div>
  );
}

export default JobCard;
