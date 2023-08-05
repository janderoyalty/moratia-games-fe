import React from "react";
import "./Kickstarter.css";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Countdown from "./Countdown";

const Kickstarter = () => {
  return (
    <Row className="content" id="kickstarter">
      <Col id="kickstarter-left" sm={12} md={12} lg={7}>
        <Row className="headers-text" id="kickstarter-left--top">
          Kickstarter
        </Row>
        <Image
          src={
            "https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia_Games__Kickstarter.jpeg?alt=media&token=235317df-e4db-492c-9da6-6c9d3b7b4c10"
          }
          alt={
            "Moratia Games image for Kickstarter with 4 characters the rainbow and white background"
          }
          rounded
          id="kickstarter-image"
        ></Image>
      </Col>
      <Col id="kickstarter-right" sm={12} md={12} lg={5}>
        <Row id="kickstarter-right--top">
          <p className="sub-headers" id="kickstarter-right--top--text">
            100% funded in the first 48 hours!
          </p>
          <a
            href="https://www.kickstarter.com/projects/moratiagames/moratia-card-quest-game"
            target="_blank"
            rel="noopener noreferrer"
            id="kickstarter-logo-image-container"
          >
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2Ftq0sfld-kickstarter-logo-green.png?alt=media&token=4eea1ca5-023c-423a-bb71-246c877a8bfd"
              }
              alt={"Kickstarter green logo"}
              rounded
              id="kickstarter-logo-image"
            ></Image>
          </a>
        </Row>
        <Row>
          <p id="kickstarter-right--title">You can still back us for another</p>
          {/* </Row>
        <Row id="countdown-container"> */}
          <Countdown id="countdown-timer"></Countdown>
        </Row>
      </Col>
    </Row>
  );
};

export default Kickstarter;
