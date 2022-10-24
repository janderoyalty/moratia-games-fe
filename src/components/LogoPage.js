import React from "react";
import logo from "../images/Moratia_Games_stacked_black_logo.png";
import "./LogoPage.css";

const LogoPage = () => {
  return (
    <div className="content" id="home">
      <div id="logo-container">
        <img id="landing-logo" src={logo} alt="Moratia Games logo black" />{" "}
      </div>
    </div>
  );
};

export default LogoPage;
