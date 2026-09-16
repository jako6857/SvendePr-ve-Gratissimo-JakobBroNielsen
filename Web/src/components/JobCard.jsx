import "../scss/JobCard.scss";

function JobCard({ job, onOpen }) {
  return (
    <div className="job-card">
      <div>
        <p className="org">{job.organization}</p>
        <h2>{job.title}</h2>
        <p>{job.description}</p>
      </div>

      <div>
        <p>Lokation: {job.city}</p>
        <p>Indrykket: {new Date(job.createdAt).toLocaleDateString("da-DK")}</p>

        <div className="actions">
          <button>Gem</button>
          <button onClick={() => onOpen(job.id)}>Åben</button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
