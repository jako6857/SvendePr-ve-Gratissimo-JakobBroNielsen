import { Link, NavLink } from "react-router-dom";
import "../scss/NavBar.scss";

//vi bruger Link så vi er fri for at genindlæse siden, når vi navigerer rundt i vores app.

function NavBar({ user, logout }) {
  return (
    <nav className="navbar">
      <div className="container ">
        <div>
          <NavLink to="alle-jobs">Alle Jobs</NavLink>
          <NavLink to="opret-annonce">Opret Annonce</NavLink>
          <NavLink to="nyheder">Nyheder</NavLink>
        </div>
        {user && (
          <div className="nav-auth alwaysbold">
            <NavLink to="/MinSide">Min side</NavLink>
            <span className="divider"></span>

            <a onClick={logout}>Log ud</a>
          </div>
          //best practice ville være en  button og give den endnu en class, men til vores behov er et a tag helt fint.
        )}

        {!user && (
          <div className="nav-auth alwaysbold">
            <NavLink to="/log-ind">Log ind</NavLink>
            <span className="divider"></span>
            <NavLink to="/opret-profil">Opret profil</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
