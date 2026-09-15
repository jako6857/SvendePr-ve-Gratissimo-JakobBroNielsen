import React from "react";
import { Link } from "react-router-dom";
import "../scss/CtaBanner.scss";

function CtaBanner() {
  return (
    <div className="container cta-banner">
      <p className="cta-text">
        Vi hjælper dig på vej til dit næste frivillige job
      </p>
      <Link className="cta-button" to="/log-ind">
        Log ind eller opret dig
      </Link>
    </div>
  );
}

export default CtaBanner;
