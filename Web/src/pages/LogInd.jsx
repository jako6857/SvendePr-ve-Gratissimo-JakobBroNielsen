import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export function LogInd() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, logout } = useAuth();

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
    <form onSubmit={handleSubmit}>
      <h2>Log ind</h2>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Skriv din Email..."
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Skriv dit Password..."
      />

      {error && <p>{error}</p>}

      <button type="submit">Log ind</button>
      <button type="submit">Opret Bruger</button>
    </form>
  );
}

export default LogInd;
