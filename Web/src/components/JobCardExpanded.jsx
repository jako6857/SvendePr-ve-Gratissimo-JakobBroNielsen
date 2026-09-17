import { addFavorite, deleteFavorite } from "../api/favorites";

function formatDate(dateString) {
  const date = new Date(dateString);
  return `d. ${date.getDate()}`;
}

function JobCardExpanded({ job, onClose }) {
  return (
    <div className="job-card-container">
      <div>
        <p>{job.organization}</p>
        <h2>{job.title}</h2>
        <p>{job.jobCategory.name}</p>

        <h3>Beskrivelse</h3>
        <p>{job.description}</p>

        <h3>Erfaring</h3>
        <p>Ingen særlig erfaring kræves, men gerne lyst til at hjælpe andre.</p>

        <h3>Arbejdsopgaver</h3>
        <p>Varierende opgaver aftalt løbende med organisationen.</p>
      </div>

      <div>
        <div>
          <p>
            Lokation: <strong>{job.city}</strong>
          </p>
          <p>
            Indrykket: <strong>{formatDate(job.createdAt)}</strong>
          </p>
          <p>
            Arbejdstid: <strong>{job.workType.type}</strong>
          </p>
          <p>
            Hjemmearbejde: <strong>{job.workHome}</strong>
          </p>
        </div>

        <div>
          <h3>Kontakt</h3>
          <p>{job.organization}</p>
          <p>Tlf: {job.user.phone}</p>
          <p>Email: {job.user.email}</p>
          <p>
            Att: {job.user.firstname} {job.user.lastname}
          </p>
        </div>

        <div>
          <button
            className="fjernFavorit"
            onClick={() =>
              saved ? deleteFavorite(job.id) : addFavorite(job.id)
            }
          >
            Fjern <img src="/Heart.png" alt="" className="btn-icon" />
          </button>
          <button className="btn" onClick={onClose}>
            Luk
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCardExpanded;
