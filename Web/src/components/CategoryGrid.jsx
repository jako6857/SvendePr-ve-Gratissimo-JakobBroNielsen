import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobData } from "../api/jobs";
import "../scss/CategoryGrid.scss";

function countJobsPerCategory(jobs, categoryId) {
  return jobs.filter((job) => job.jobCategoryId === categoryId).length;
} //Siden der kun er Name og ID fra job-listings endpointet, så bliver vi nødt til at se hvor mange jobs der rent faktisk er i hver kategori.

function CategoryGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobData("job-categories").then(setCategories);
    getJobData("job-listings").then(setJobs);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/jobs?category=${categoryId}`);
  };

  //vi bliver nødt til at lave sådan en kompliceret knap, da brugeren ikke bare skal sendes til statisk page, den skal rent faktisk..
  // tjekke live hvilket id brugeren trykker på samt sende det videre til jobs pagen.
  console.log("jobs:", jobs);
  console.log("categories:", categories);

  return (
    <section className="category-grid-section container">
      <h2>Find job ved kategori</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <span className="category-name">{category.name}</span>
            <span className="category-count">
              {countJobsPerCategory(jobs, category.id)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
