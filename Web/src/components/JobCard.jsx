import { useState } from "react";
import "../scss/JobCard.scss";

function JobCard({ job, user, favorite, onAddFavorite, onRemoveFavorite }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  //saved er ikke state. den udregnes ud fra om der findes en favorit til jobbet
  const saved = Boolean(favorite);

  function handleToggleFavorite() {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    if (favorite) {
      onRemoveFavorite(favorite.id); //husk: favorittens id, ikke jobbets
    } else {
      onAddFavorite(job.id);
    }
  }

  return (
    <div className={isExpanded ? "job-card expanded" : "job-card"}>
      <div className="job-card-left">
        <p className="organization">{job.organization}</p>
        <h2>{job.title}</h2>
        <p>{job.description}</p>

        {/* alt herinde vises kun når kortet er foldet ud */}
        {isExpanded && (
          <>
            <h3>Erfaring</h3>
            <p>
              Ingen særlig erfaring kræves, men gerne lyst til at hjælpe andre.
            </p>

            <h3>Arbejdsopgaver</h3>
            <p>Varierende opgaver aftalt løbende med organisationen.</p>

            <h3>Kontakt</h3>
            <p>Tlf: {job.user.phone}</p>
            <p>Email: {job.user.email}</p>
            <p>
              Att: {job.user.firstname} {job.user.lastname}
            </p>
          </>
        )}
      </div>

      <div className="job-card-right">
        <p>Lokation: {job.city}</p>
        <p>Indrykket: {new Date(job.createdAt).toLocaleDateString("da-DK")}</p>

        {isExpanded && (
          <>
            <p>Kategori: {job.jobCategory.name}</p>
            <p>Arbejdstid: {job.workType.type}</p>
            <p>Hjemmearbejde: {job.workHome}</p>
          </>
        )}

        <div className="actions">
          <button className="button-Container" onClick={handleToggleFavorite}>
            {saved ? "Fjern" : "Gem"}
            <img
              src={saved ? "/HeartFilled.png" : "/Heart.png"}
              alt=""
              className="button-icon"
            />
          </button>
          <button
            className="button-Container"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Luk" : "Åben"}
          </button>
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
