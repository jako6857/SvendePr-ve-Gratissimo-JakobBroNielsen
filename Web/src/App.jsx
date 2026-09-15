import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth.js";
import LogInd from "./pages/LogInd.jsx";
import OpretAnnonce from "./pages/OpretAnnonce.jsx";
import OpretProfil from "./pages/OpretProfil.jsx";
import Forside from "./pages/Forside.jsx";
import AlleJobs from "./pages/AlleJobs.jsx";
import NyhedsPage from "./pages/NyhedsPage.jsx";
import MinSide from "./pages/MinSide.jsx";
import NavBar from "./components/NavBar.jsx";
import Header from "./components/Header.jsx";
import CtaBanner from "./components/CtaBanner.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const { user, login, logout } = useAuth();
  return (
    <>
      <Header />
      <NavBar user={user} logout={logout} />
      {!user && <CtaBanner />}
      <Footer />
      <Routes>
        <Route path="/" element={<Forside />} />
        <Route path="/alle-jobs" element={<AlleJobs />} />
        <Route path="/nyheder" element={<NyhedsPage />} />
        <Route path="/min-side" element={<MinSide />} />
        <Route path="/log-ind" element={<LogInd login={login} />} />
        <Route path="/opret-profil" element={<OpretProfil />} />
        <Route path="/opret-annonce" element={<OpretAnnonce />} />
      </Routes>
    </>
  );
}

export default App;
