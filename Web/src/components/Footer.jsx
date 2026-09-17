import { useState } from "react";
import { Link } from "react-router-dom";
import { subscribeToNewsletter } from "../api/newsletter.js";
import "../scss/Footer.scss";
import React from "react";
import LinkedIn from "../assets/LinkedIn.png";
import Facebook from "../assets/Facebook.png";
import Instagram from "../assets/Instagram.png";
import Google from "../assets/Google.png";

function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("form");

  async function handleSubscribe(event) {
    event.preventDefault();
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
    } catch (error) {
      //hvis email findes kan der gives et konkret svar til brugeren, og føre personen hurtigt videre.
      if (error.message === "Email already exists") {
        setStatus("exists");
      } else {
        console.error("Fejl ved tilmelding til nyhedsbrev:", error);
        setStatus("error");
      }
    }
  }

  return (
    <footer>
      <div className="container">
        <div className="footer-column">
          <h4>For jobsøgere</h4>
          <ul>
            <li>
              <Link to="/min-side">Din kundeside</Link>
            </li>
            <li>
              <Link to="/opret-profil">Opret profil</Link>
            </li>
            <li>
              <Link to="/gemte-jobs">Gemte jobs</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>For arbejdsgivere</h4>
          <ul>
            <li>
              <Link to="/virksomhedsprofil">Virksomhedsprofil</Link>
            </li>
            <li>
              <Link to="/opret-annonce">Opret annonce</Link>
            </li>
            <li>
              <Link to="/rekruttering">Rekruttering</Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Links</h4>
          <ul>
            <li>
              <Link to="/om-gratissimo">Om Gratissimo</Link>
            </li>
            <li>
              <Link to="/job-hos-os">Job hos os</Link>
            </li>
            <li>
              <Link to="/presse">Presse</Link>
            </li>
          </ul>
        </div>
        <div className="footer-newsletter">
          <h4>Vil du have jobs direkte i din indbakke?</h4>
          <p>Tilmeld dig vores elektroniske nyhedsbrev</p>

          {(status === "form" || status === "error") && (
            <form className="nyhedsbrev-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="@Indtast email..."
                required
              />
              <button type="submit">Tilmeld</button>
            </form>
          )}

          {status === "success" && <p>Tak! Du er nu tilmeldt nyhedsbrevet.</p>}
          {status === "exists" && <p>Du er allerede tilmeldt nyhedsbrevet.</p>}
          {status === "error" && <p>Noget gik galt. Prøv igen.</p>}
        </div>
        <div>
          <p>Fidusvej 23</p>
          <p>9230 Øster Lundby</p>
          <p>+45 22 13 22 13</p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/gratissimo">
              <img src={LinkedIn} alt="LinkedIn-Social" />
            </a>
            <a href="https://www.facebook.com/gratissimo">
              <img src={Facebook} alt="Facebook-Social" />
            </a>
            <a href="https://www.instagram.com/gratissimo">
              <img src={Instagram} alt="Instagram-Social" />
            </a>
            <a href="https://www.google.com">
              <img src={Google} alt="Google-Social" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
