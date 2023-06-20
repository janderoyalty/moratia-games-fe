import React from "react";
import "./Kickstarter.css";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

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
        <Row className="sub-headers" id="kickstarter-right--title">
          The project goes live:
        </Row>
        <Row id="kickstarter-right--date">August 3, 2023</Row>
        <Row id="kickstarter-left--bottom">
          <div>
            Head to our Kickstarter preview page to be the first to know when it
            goes live.
          </div>
          <a
            href="https://www.kickstarter.com/projects/moratiagames/moratia-card-quest-game"
            target="_blank"
            rel="noopener noreferrer"
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
      </Col>
    </Row>
  );
};

export default Kickstarter;
