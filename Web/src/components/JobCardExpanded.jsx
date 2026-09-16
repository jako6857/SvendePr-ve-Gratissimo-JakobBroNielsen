function formatDate(dateString) {
  const date = new Date(dateString);
  return `d. ${date.getDate()}`;
}

function JobCardExpanded({ job, onClose }) {
  return (
    <div className="job-card-expanded">
      <div className="job-card-expanded__left">
        <p className="job-card-expanded__org">{job.organization}</p>
        <h2 className="job-card-expanded__title">{job.title}</h2>
        <p className="job-card-expanded__category">{job.jobCategory.name}</p>

        <h3>Beskrivelse</h3>
        <p>{job.description}</p>

        <h3>Erfaring</h3>
        <p>Ingen særlig erfaring kræves, men gerne lyst til at hjælpe andre.</p>

        <h3>Arbejdsopgaver</h3>
        <p>Varierende opgaver aftalt løbende med organisationen.</p>
      </div>

      <div className="job-card-expanded__right">
        <div className="job-card-expanded__facts">
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

        <div className="job-card-expanded__contact">
          <h3>Kontakt</h3>
          <p>{job.organization}</p>
          <p>Tlf: {job.user.phone}</p>
          <p>Email: {job.user.email}</p>
          <p className="job-card-expanded__contact-att">
            Att: {job.user.firstname} {job.user.lastname}
          </p>
        </div>

        <div className="job-card-expanded__actions">
          <button className="btn btn--outline">Fjern ♥</button>
          <button className="btn" onClick={onClose}>
            Luk
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCardExpanded;
