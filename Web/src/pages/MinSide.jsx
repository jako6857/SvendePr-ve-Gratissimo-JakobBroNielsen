import { useState, useEffect } from "react";
import { getFavorites, deleteFavorite } from "../api/favorites";
import { getJobData, deleteJob } from "../api/jobs";
import { Link } from "react-router-dom";
import RedigerProfil from "../components/RedigerProfil";
import "../scss/JobCard.scss";
import "../scss/MinSide.scss";

function MinSide({ user, logout }) {
  const [tab, setTab] = useState("annoncer");
  const [favorites, setFavorites] = useState([]);
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    if (!user) return;
    getFavorites()
      .then(setFavorites)
      .catch((error) =>
        console.error("Fejl ved hentning af favoritter:", error),
      );
  }, [user]);

  //api'et har ingen rute til "mine annoncer", så vi henter alle og beholder dem brugeren selv har oprettet
  useEffect(() => {
    if (!user) return;
    getJobData("job-listings")
      .then((jobs) =>
        setMyJobs(
          jobs
            .filter((job) => job.userId === user.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        ),
      )
      .catch((error) =>
        console.error("Fejl ved hentning af mine annoncer:", error),
      );
  }, [user]);

  async function handleRemoveFavorite(favoriteId) {
    try {
      await deleteFavorite(favoriteId);
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.id !== favoriteId),
      );
    } catch (error) {
      console.error("Fejl ved fjernelse af favorit:", error);
    }
  }

  async function handleDeleteJob(jobId) {
    //en annonce kan ikke gendannes, så vi spørger før vi sletter
    if (!window.confirm("Er du sikker på at du vil slette annoncen?")) {
      return;
    }
    try {
      await deleteJob(jobId);
      setMyJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Fejl ved sletning af annonce:", error);
    }
  }

  if (!user) return <p>Du skal være logget ind for at se denne side.</p>;

  return (
    <div className="min-side">
      <div className="min-side-header">
        <h1>Velkommen {user.firstname}</h1>
        <p>
          Rediger eller slet dine annoncer. Du kan også danne dig et overblik
          over de annoncer du har gemt som favorit, samt fjerne dem igen.
        </p>

        <div className="min-side-links">
          <a onClick={logout}>Log ud</a>
          <Link to="/rediger-profil">Rediger Profil</Link>
        </div>
      </div>

      <div className="min-side-tabs">
        <div className="tabs">
          <button
            className={tab === "annoncer" ? "active" : ""}
            onClick={() => setTab("annoncer")}
          >
            Mine annoncer
          </button>
          <button
            className={tab === "favoritter" ? "active" : ""}
            onClick={() => setTab("favoritter")}
          >
            Mine favoritter
          </button>
        </div>
      </div>

      {tab === "annoncer" && (
        <div className="job-list">
          {myJobs.length === 0 && (
            <p>Du har ikke oprettet nogen annoncer endnu.</p>
          )}
          {myJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div>
                <p className="organization">{job.organization}</p>
                <h2>{job.title}</h2>
                <p>{job.description}</p>
              </div>
              <div>
                <p>Lokation: {job.city}</p>
                <p>
                  Indrykket:{" "}
                  {new Date(job.createdAt).toLocaleDateString("da-DK")}
                </p>
                <button onClick={() => handleDeleteJob(job.id)}>Slet</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "favoritter" && (
        <div className="favorite-list">
          {favorites.length === 0 && <p>Du har ingen favoritter endnu.</p>}
          {favorites.map((favorite) => (
            <div key={favorite.id} className="job-card">
              <div>
                <p className="org">{favorite.jobListing.organization}</p>
                <h2>{favorite.jobListing.title}</h2>
                <p>{favorite.jobListing.description}</p>
              </div>
              <div>
                <p>Lokation: {favorite.jobListing.city}</p>
                <button onClick={() => handleRemoveFavorite(favorite.id)}>
                  Fjern
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MinSide;
