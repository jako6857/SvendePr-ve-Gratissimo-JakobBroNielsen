import { useState, useEffect } from "react";
import { getMyProfile, updateMyProfile } from "../api/auth.js";
import "../scss/RedigerProfil.scss";

const emptyForm = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  address: "",
  zipcode: "",
  city: "",
};

//fornavn, efternavn og email er påkrævede i databasen. resten må gerne stå tomme,
//men hvis de er udfyldt skal de se rigtige ud.
function validate(values) {
  const errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "Fornavn skal udfyldes.";
  }

  if (!values.lastname.trim()) {
    errors.lastname = "Efternavn skal udfyldes.";
  }

  if (!values.email.trim()) {
    errors.email = "Email skal udfyldes.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Email skal se ud som navn@domæne.dk.";
  }

  if (values.phone.trim() && !/^\d{8}$/.test(values.phone.trim())) {
    errors.phone = "Telefonnummer skal være 8 cifre.";
  }

  if (values.zipcode.trim() && !/^\d{4}$/.test(values.zipcode.trim())) {
    errors.zipcode = "Postnummer skal være 4 cifre, for eksempel 9000.";
  }

  return errors;
}

function RedigerProfil({ user }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  //vi henter profilen én gang og lægger værdierne ind i formularen,
  //så brugeren kan se og rette det der allerede står
  useEffect(() => {
    if (!user) return;
    getMyProfile()
      .then((profile) =>
        setForm({
          firstname: profile.firstname ?? "",
          lastname: profile.lastname ?? "",
          email: profile.email ?? "",
          //felterne må være null i databasen, men et input skal have en tekst
          phone: profile.phone === null ? "" : String(profile.phone),
          address: profile.address ?? "",
          zipcode: profile.zipcode === null ? "" : String(profile.zipcode),
          city: profile.city ?? "",
        }),
      )
      .catch((error) => {
        console.error("Fejl ved hentning af profil:", error);
        setLoadError(true);
      })
      .finally(() => setLoading(false));
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (submitted) {
      setErrors(validate(nextForm));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setSubmitError("");
    setSuccess(false);

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      await updateMyProfile(form);
      setSubmitted(false);
      setSuccess(true);
    } catch (error) {
      console.error("Fejl ved opdatering af profil:", error);
      setSubmitError("Profilen kunne ikke gemmes. Prøv igen.");
    }
  }

  if (!user) {
    return <p>Du skal være logget ind for at redigere din profil.</p>;
  }
  if (loading) {
    return <p>Indlæser...</p>;
  }
  if (loadError) {
    return <p>Kunne ikke hente din profil.</p>;
  }

  return (
    <form className="rediger-profil" onSubmit={handleSubmit} noValidate>
      <h1>Rediger profil</h1>
      <p>Fornavn, efternavn og email skal udfyldes. Resten er valgfrit.</p>

      <label>Fornavn</label>
      <input
        name="firstname"
        value={form.firstname}
        onChange={handleChange}
        aria-invalid={errors.firstname ? "true" : "false"}
      />
      {errors.firstname && <p className="field-error">{errors.firstname}</p>}

      <label>Efternavn</label>
      <input
        name="lastname"
        value={form.lastname}
        onChange={handleChange}
        aria-invalid={errors.lastname ? "true" : "false"}
      />
      {errors.lastname && <p className="field-error">{errors.lastname}</p>}

      <label>Email</label>
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        aria-invalid={errors.email ? "true" : "false"}
      />
      {errors.email && <p className="field-error">{errors.email}</p>}

      <label>Telefon</label>
      <input
        name="phone"
        inputMode="numeric"
        value={form.phone}
        onChange={handleChange}
        aria-invalid={errors.phone ? "true" : "false"}
      />
      {errors.phone && <p className="field-error">{errors.phone}</p>}

      <label>Adresse</label>
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        aria-invalid={errors.address ? "true" : "false"}
      />

      <label>Postnummer</label>
      <input
        name="zipcode"
        inputMode="numeric"
        value={form.zipcode}
        onChange={handleChange}
        aria-invalid={errors.zipcode ? "true" : "false"}
      />
      {errors.zipcode && <p className="field-error">{errors.zipcode}</p>}

      <label>By</label>
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        aria-invalid={errors.city ? "true" : "false"}
      />

      <button type="submit">Gem ændringer</button>

      {submitError && <p className="submit-error">{submitError}</p>}
      {success && <p className="success">Dine ændringer er gemt.</p>}
    </form>
  );
}

export default RedigerProfil;
