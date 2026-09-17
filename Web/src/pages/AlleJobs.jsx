import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getJobData } from "../api/jobs";
import JobCard from "../components/JobCard";
import JobCardExpanded from "../components/JobCardExpanded";
import { getFavorites, addFavorite, deleteFavorite } from "../api/favorites";

import SearchBar from "../components/SearchBar";
// import jobCard from "";
// import JobCardExpanded from "";

const workHomeById = { 1: "On-site", 2: "Remote", 3: "Hybrid" }; //<-----reference til kommentar linje 39
const periodDaysById = { 1: 7, 2: 30, 3: 365 };

function AlleJobs({ user }) {
  const [jobs, setJobs] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getJobData("job-listings")
      .then((data) => setJobs(data))
      .catch((error) => console.error("Fejl ved hentning af jobs:", error));
  }, []);

  const search = searchParams.get("search") || "";
  const region = searchParams.get("region");
  const category = searchParams.get("category");
  const workType = searchParams.get("workType");
  const period = searchParams.get("period");
  const workHome = searchParams.get("workHome");

  //vi tager og putter alle jobs i en boks, og så filtrerer vi dem ud fra de parametre som brugeren har indatstet, samt sørger vi for at den søger efter lowercase, ellers ville det skabe problemer.
  //alle de her .filter betyder bare (HAR USER VALGT? NEJ=BEHOLD ALTING, JA=FILTRER UD FRA HVAD USEREN HAR SØGT PÅ).. god tone selvfølgelig.
  const visibleJobs = jobs
    .filter((job) => job.title.toLowerCase().includes(search.toLowerCase()))
    .filter((job) => !region || job.regionId === Number(region)) //hvis user ikke har valgt region.. så vis job ellers tjek om region og job matcher
    .filter((job) => !workType || job.workTypeId === Number(workType)) //her beholder vi kun de jobs som matcher workTypeID.
    .filter((job) => !category || job.jobCategoryId === Number(category)) //her kun dem som matcher jobCategoryID samme princip
    .filter((job) => !workHome || job.workHome === workHomeById[workHome])

    //den her er straks værre,
    .filter((job) => {
      if (!period) return true; //0periode = så vis alt
      const cutoff = new Date(); //nuværende tid
      cutoff.setDate(
        cutoff.getDate() - periodDaysById[period], //logik til at finde ud af hvor mange dage tilbage vi skal gå for at finde de jobs som er indenfor den periode som useren har valgt.
      );
      return new Date(job.createdAt) >= cutoff; //sammenligner job data
    })
    .sort((a, b) =>
      sortBy === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt) //
        : a.title.localeCompare(b.title),
    );
  //? : ternary Operators det betyder egentlig bare if else rundt regnet.
  //a og b er ligegyldigt man kunne skrive job1 og job2

  return (
    <>
      <SearchBar />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="newest">Nyeste</option>
        <option value="alphabetical">Alfabetisk</option>
      </select>

      <div className="job-list">
        {visibleJobs.map((job) =>
          job.id === expandedJobId ? (
            <JobCardExpanded
              key={job.id}
              job={job}
              onClose={() => setExpandedJobId(null)}
            />
          ) : (
            <JobCard
              key={job.id}
              job={job}
              onOpen={setExpandedJobId}
              user={user}
            />
          ),
        )}
      </div>
    </>
  );
}

export default AlleJobs;
