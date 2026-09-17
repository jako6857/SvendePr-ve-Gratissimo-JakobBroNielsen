import { useState } from "react";
import { Link } from "react-router-dom";
import usejobForm from "../hooks/useJobs.js";
import "../scss/OpretAnnonce.scss";

//en tom formular. bruges både som startværdi og når vi rydder felterne efter oprettelse
const emptyForm = {
  title: "",
  description: "",
  organization: "",
  address: "",
  zipcode: "",
  city: "",
  workHome: "",
  regionId: "",
  jobCategoryId: "",
  workTypeId: "",
};

//tjekker alle felter og returnerer et objekt med en besked per felt der er galt.
//et tomt objekt betyder at formularen er i orden.
function validate(values) {
  const errors = {};

  //vi starter med 0 fejl hvorefter vi går igennem dem input for input og tjekker om de er udfyldt korrekt
  //.trim sørger for der ikke er mismatch med empty input felt eller mellemrum så brugeren ikke kan skrive mellemrum i felterne.

  if (!values.title.trim()) {
    errors.title = "Titel skal udfyldes.";
  } else if (values.title.trim().length < 3) {
    errors.title = "Titel skal være mindst 3 tegn.";
  }

  if (!values.description.trim()) {
    errors.description = "Beskrivelse skal udfyldes.";
  } else if (values.description.trim().length < 20) {
    errors.description =
      "Beskrivelsen skal være mindst 20 tegn, så ansøgeren ved hvad opgaven går ud på.";
  }

  if (!values.organization.trim()) {
    errors.organization = "Organisation skal udfyldes.";
  }

  if (!values.address.trim()) {
    errors.address = "Adresse skal udfyldes.";
  }

  if (!values.zipcode.trim()) {
    errors.zipcode = "Postnummer skal udfyldes.";
  } else if (!/^\d{4}$/.test(values.zipcode.trim())) {
    errors.zipcode = "Postnummer skal være 4 cifre, for eksempel 9000.";
  }

  if (!values.city.trim()) {
    errors.city = "By skal udfyldes.";
  }

  if (!values.workHome) {
    errors.workHome = "Vælg om arbejdet er On-site, Remote eller Hybrid.";
  }

  if (!values.regionId) {
    errors.regionId = "Vælg en region.";
  }

  if (!values.jobCategoryId) {
    errors.jobCategoryId = "Vælg en kategori.";
  }

  if (!values.workTypeId) {
    errors.workTypeId = "Vælg en arbejdstid.";
  }

  return errors;
}

function OpretAnnonce({ user }) {
  const { categories, regions, workTypes, loading, error, submitJobForm } =
    usejobForm(); //alle dem her får vi fra usejob.js

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);

  //én handler til alle felter. name på inputtet fortæller hvilket felt i state der skal opdateres
  function handleChange(event) {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value }; //individuelt felt
    setForm(nextForm);

    //først efter et forsøg på at sende viser vi fejl løbende, så man ser dem forsvinde når man retter
    if (submitted) {
      setErrors(validate(nextForm)); //vi tjekker først efter fejl når der bliver trykket opret annonce.
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setSubmitError("");
    setSuccess(false); //vi ved først om den er godkendt efter der er kørt validation

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      //flere fejl end 0 = hop ud af funktionen og vis fejl.
      return; //der er fejl i felterne, så vi sender ikke noget til api'et
    }

    try {
      //api'et læser userId fra body, så vi sender den indloggede brugers id med
      await submitJobForm({ ...form, userId: user.id });
      setForm(emptyForm); //ryd form felt
      setErrors({}); //ryd fejl
      setSubmitted(false); //useState setsubmitted skal self være falsk når vi er ved at oprette ny annonce
      setSuccess(true); //vi har oprettet en ny annonce
    } catch (error) {
      console.error("Fejl ved oprettelse af job:", error);
      setSubmitError("Annoncen kunne ikke oprettes. Prøv igen.");
    }
  }

  if (!user) {
    return <p>Du skal være logget ind for at oprette en annonce.</p>;
  }
  if (loading) {
    return <p>Indlæser...</p>;
  }
  if (error) {
    return <p>Kunne ikke hente kategorier, regioner og arbejdstyper.</p>;
  }

  return (
    <form className="opret-annonce" onSubmit={handleSubmit} noValidate>
      <h1>Opret annonce</h1>
      <p>Alle felter skal udfyldes.</p>

      <label>Titel</label>
      <input
        id="title"
        name="title"
        value={form.title}
        onChange={handleChange}
        aria-invalid={errors.title ? "true" : "false"} //rød border omkring input.
      />
      {errors.title && <p className="field-error">{errors.title}</p>}

      <label>Beskrivelse</label>
      <textarea
        id="description"
        name="description"
        rows={10}
        value={form.description}
        onChange={handleChange}
        aria-invalid={errors.description ? "true" : "false"}
      />
      {errors.description && (
        <p className="field-error">{errors.description}</p>
      )}

      <label>Organisation</label>
      <input
        id="organization"
        name="organization"
        value={form.organization}
        onChange={handleChange}
        aria-invalid={errors.organization ? "true" : "false"}
      />
      {errors.organization && (
        <p className="field-error">{errors.organization}</p>
      )}

      <label>Adresse</label>
      <input
        id="address"
        name="address"
        value={form.address}
        onChange={handleChange}
        aria-invalid={errors.address ? "true" : "false"}
      />
      {errors.address && <p className="field-error">{errors.address}</p>}

      <label>Postnummer</label>
      <input
        id="zipcode"
        name="zipcode"
        inputMode="numeric"
        value={form.zipcode}
        onChange={handleChange}
        aria-invalid={errors.zipcode ? "true" : "false"}
      />
      {errors.zipcode && <p className="field-error">{errors.zipcode}</p>}

      <label>By</label>
      <input
        id="city"
        name="city"
        value={form.city}
        onChange={handleChange}
        aria-invalid={errors.city ? "true" : "false"}
      />
      {errors.city && <p className="field-error">{errors.city}</p>}

      <label>Hjemmearbejde</label>
      <select
        id="workHome"
        name="workHome"
        value={form.workHome}
        onChange={handleChange}
        aria-invalid={errors.workHome ? "true" : "false"}
      >
        <option value="">Vælg...</option>
        <option value="On-site">On-site</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
      </select>
      {errors.workHome && <p className="field-error">{errors.workHome}</p>}

      <label>Region</label>
      <select
        id="regionId"
        name="regionId"
        value={form.regionId}
        onChange={handleChange}
        aria-invalid={errors.regionId ? "true" : "false"}
      >
        <option value="">Vælg...</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>
      {errors.regionId && <p className="field-error">{errors.regionId}</p>}

      <label>Kategori</label>
      <select
        id="jobCategoryId"
        name="jobCategoryId"
        value={form.jobCategoryId}
        onChange={handleChange}
        aria-invalid={errors.jobCategoryId ? "true" : "false"}
      >
        <option value="">Vælg...</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.jobCategoryId && (
        <p className="field-error">{errors.jobCategoryId}</p>
      )}

      <label>Arbejdstid</label>
      <select
        id="workTypeId"
        name="workTypeId"
        value={form.workTypeId}
        onChange={handleChange}
        aria-invalid={errors.workTypeId ? "true" : "false"}
      >
        <option value="">Vælg...</option>
        {workTypes.map((workType) => (
          <option key={workType.id} value={workType.id}>
            {workType.type}
          </option>
        ))}
      </select>
      {errors.workTypeId && <p className="field-error">{errors.workTypeId}</p>}

      <button type="submit">Opret annonce</button>

      {submitError && <p className="submit-error">{submitError}</p>}

      {success && (
        <p className="success">
          Annoncen er oprettet.{" "}
          <Link to="/min-side">Se den under Mine annoncer</Link>
        </p>
      )}
    </form>
  );
}

export default OpretAnnonce;
