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
  const { user, login, logout, signup } = useAuth();
  return (
    <>
      <Header />
      <NavBar user={user} logout={logout} />
      {!user && <CtaBanner />}

      <Routes>
        <Route path="/" element={<Forside />} />
        <Route
          path="/alle-jobs"
          element={<AlleJobs login={login} user={user} />}
        />
        <Route path="/nyheder/:id" element={<NyhedsPage />} />
        <Route
          path="/min-side"
          element={<MinSide login={login} user={user} />}
        />
        <Route path="/log-ind" element={<LogInd login={login} />} />
        <Route path="/opret-profil" element={<OpretProfil signup={signup} />} />
        <Route path="/opret-annonce" element={<OpretAnnonce />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
