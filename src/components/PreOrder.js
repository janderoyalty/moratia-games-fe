import React from "react";
import "./Kickstarter.css";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const PreOrder = () => {
  return (
    <Row className="content" id="kickstarter">
      <Col id="kickstarter-left" sm={12} md={12} lg={7}>
        <Row className="headers-text" id="kickstarter-left--top">
          Pre Order
        </Row>
        <Image
          src={
            "https://storage.cloud.google.com/moratia-games.appspot.com/Moratia%20CQG%20Moratia%20Card%20Quest%20Game%20preorder%20image.png"
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
            Missed the Kickstarter? You can still pre order a first-edition copy of Moratia Card Quest Game.
          </p>
        </Row>
      </Col>
    </Row>
  );
};

export default PreOrder;
