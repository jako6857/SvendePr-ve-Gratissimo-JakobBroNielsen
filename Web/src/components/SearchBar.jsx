import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getJobData } from "../api/jobs";
import Dropdown from "./Dropdown";
import "../scss/SearchBar.scss";

const periodOptions = [
  { id: 1, name: "Seneste uge" },
  { id: 2, name: "Seneste måned" },
  { id: 3, name: "Seneste år" },
];
const workHomeOptions = [
  { id: 1, name: "On-site" },
  { id: 2, name: "Remote" },
  { id: 3, name: "Hybrid" },
];

function SearchBar() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [workType, setWorkType] = useState("");
  const [period, setPeriod] = useState("");
  const [workHome, setWorkHome] = useState("");

  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

  //vi sætter fetch logikken så vi er klar til at fetche med endpoints fra api'et
  // og det er self med useState og effect så vi selv kan styre hvornår der bliver renderet data

  useEffect(() => {
    getJobData("job-categories").then(setCategories);
  }, []);

  useEffect(() => {
    getJobData("regions").then(setRegions);
  }, []);

  useEffect(() => {
    getJobData("workTypes").then(setWorkTypes);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (region) params.set("region", region);
    if (category) params.set("category", category);
    if (workType) params.set("workType", workType);
    if (period) params.set("period", period);
    if (workHome) params.set("workHome", workHome);

    navigate(`/alle-jobs?${params.toString()}`);
  };

  function HandleReset() {
    setSearchTerm("");
    setRegion("");
    setCategory("");
    setWorkType("");
    setPeriod("");
    setWorkHome("");
    navigate("/alle-jobs");
  }

  return (
    <section className="search-section">
      <div className="container">
        <h2>Søg frivilligt arbejde:</h2>
        <form onSubmit={handleSearch} className="search-input-row">
          <input
            className="search-input"
            type="text"
            placeholder="Eks. cafémedhjælper..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Søg</button>
        </form>
        <div className="filter-row">
          <h3>Filtrer:</h3>
          <Dropdown
            className="dropdown"
            options={regions}
            name="Region"
            value={region}
            onChange={setRegion}
          />
          <Dropdown
            className="dropdown"
            options={categories}
            name="Kategorier"
            value={category}
            onChange={setCategory}
          />
          <Dropdown
            className="dropdown"
            options={workTypes}
            name="Arbejdstid"
            value={workType}
            onChange={setWorkType}
            labelKey="type"
          />
          <Dropdown
            className="dropdown"
            options={periodOptions}
            name="Periode"
            value={period}
            onChange={setPeriod}
          />
          <Dropdown
            className="dropdown"
            options={workHomeOptions}
            name="Hjemmearbejde"
            value={workHome}
            onChange={setWorkHome}
          />
          <button className="reset-button" type="button" onClick={HandleReset}>
            Nulstil
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchBar;
