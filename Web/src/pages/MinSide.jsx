import { useState, useEffect } from "react";
import { getFavorites, deleteFavorite } from "../api/favorites";

function MinSide({ user }) {
  const [tab, setTab] = useState("annoncer");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!user) return;
    getFavorites()
      .then(setFavorites)
      .catch((error) =>
        console.error("Fejl ved hentning af favoritter:", error),
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

  if (!user) return <p>Du skal være logget ind for at se denne side.</p>;

  return (
    <div className="min-side">
      <h1>Velkommen {user.firstname}</h1>

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

      {tab === "annoncer" && <p>Mine annoncer kommer snart.</p>}
    </div>
  );
}

export default MinSide;
