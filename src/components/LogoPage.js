import React from "react";
import "./LogoPage.css";
import EmbeddedVideo from "./Video";

const LogoPage = () => {
  return (
    <div className="content" id="home">
      <div id="logo-container">
        <img
          id="landing-logo"
          src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia_Games_logo.png?alt=media&token=246499e7-740e-42c0-9bf0-308085e6fbed"
          alt="Moratia Games logo black"
        />
        <EmbeddedVideo id="embedded-video" embedId="eT-IBcP8uoM"></EmbeddedVideo>
      </div>
    </div>
  );
};

export default LogoPage;
