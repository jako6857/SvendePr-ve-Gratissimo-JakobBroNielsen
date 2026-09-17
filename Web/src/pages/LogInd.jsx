import { useState } from "react";
import { Link } from "react-router-dom";
import "../scss/OpretProfil.scss";

export function LogInd({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(email, password); //email og password fra useAuth
    } catch (error) {
      setError("Forkert email eller password");
    }
  };

  return (
    <div className="opret-profil-page">
      <form onSubmit={handleSubmit}>
        <h2>Log ind</h2>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Skriv din Email..."
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Skriv dit Password..."
          required
        />
        {error && <p>{error}</p>}
        <button type="submit">Log ind</button>
        <Link to="/opret-profil" type="submit">
          Opret Bruger
        </Link>
      </form>
    </div>
  );
}

export default LogInd;
