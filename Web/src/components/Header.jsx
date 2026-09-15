import "../scss/Header.scss";
import { use } from "react";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="header">
      <div className="container ">
        <a href="/">
          <img src={logo} alt="Gratissimo" />
        </a>
      </div>
    </header>
  );
}
export default Header;
