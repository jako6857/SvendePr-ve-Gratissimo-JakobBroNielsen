import { useState, useEffect } from "react";
import { getjobData, createJob } from "../api/jobs.js";

function usejobForm() {
  const [categories, setCategories] = useState([]);
  const [regions, setRegions] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchjobData() {
      try {
        const [categoriesData, regionsData, workTypesData] = await promise.all([
          //vi bruger promise her så at vi kan hente alle 3 kategorier på en gang, sådan at vi ikke skal vente på hver enkelte bliverh hentet.
          getjobData("categories"),
          getjobData("regions"),
          getjobData("workTypes"),
        ]);
        setCategories(categoriesData);
        setRegions(regionsData);
        setWorkTypes(workTypesData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchjobData();
  }, []);

  async function submitJobForm(jobData) {
    return await createJob(jobData);
  }

  return { categories, regions, workTypes, loading, error, submitJobForm };
}
export default usejobForm;
