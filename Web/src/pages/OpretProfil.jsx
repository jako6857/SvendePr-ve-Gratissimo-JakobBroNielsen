import { useState } from "react";

//formularen til at oprette en bruger. felterne kommer fra api dokumentationen
//under Users -> Create User. de fire første er påkrævet, resten er valgfrie.

function OpretProfil({ signup }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    //de to passwords skal være helt ens, ellers sender vi ikke noget afsted
    if (password !== repeatPassword) {
      setError("De to passwords er ikke ens");
      return;
    }

    try {
      //repeatPassword sendes ikke med, da api'et spreder hele body'en ind i
      //prisma og derfor fejler på felter som ikke findes på user modellen
      await signup({
        firstname,
        lastname,
        email,
        password,
        phone,
        address,
        city,
        zipcode,
      });
    } catch (error) {
      setError("Kunne ikke oprette bruger. Emailen er måske allerede i brug.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Opret profil</h2>

      <label>Fornavn</label>
      <input
        type="text"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="Skriv dit fornavn..."
        required
      />

      <label>Efternavn</label>
      <input
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        placeholder="Skriv dit efternavn..."
        required
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Skriv din email..."
        required
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Vælg et password..."
        required
      />

      <label>Gentag password</label>
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="Skriv dit password igen..."
        required
      />

      {/* herunder er de valgfrie felter ifølge api dokumentationen */}
      <label>Telefon</label>
      <input
        type="tel"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 8))
        }
        placeholder="Skriv dit telefon nummer..."
      />

      <label>Adresse</label>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Skriv din adresse..."
      />

      <label>Postnummer</label>
      <input
        type="text"
        onChange={(e) =>
          setZipcode(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
        }
        value={zipcode}
        placeholder="Skriv dit postnummer...  "
      />

      <label>By</label>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Skriv din by..."
      />

      {error && <p>{error}</p>}

      <button type="submit">Opret profil</button>
    </form>
  );
}

export default OpretProfil;
