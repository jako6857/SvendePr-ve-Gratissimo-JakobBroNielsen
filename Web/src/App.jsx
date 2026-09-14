import { Routes, Route } from "react-router-dom";
import LogInd from "./pages/LogInd.jsx";
import OpretAnnonce from "./pages/OpretAnnonce.jsx";
import OpretProfil from "./pages/OpretProfil.jsx";
import Forside from "./pages/Forside.jsx";
import AlleJobs from "./pages/AlleJobs.jsx";
import NyhedsPage from "./pages/NyhedsPage.jsx";
import MinSide from "./pages/MinSide.jsx";

function App() {
  return (
    <>
      <header />
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/log-ind" element={<LogInd />} />
        <Route path="/opret-profil" element={<OpretProfil />} />
        <Route path="/opret-annonce" element={<OpretAnnonce />} />
      </Routes>
      <footer />
    </>
  );
}

export default App;
