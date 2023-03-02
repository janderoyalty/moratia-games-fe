import React from "react";
import "./Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="content" id="footer">
      <Row>
        <Col>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia_Games_logo_white.png?alt=media&token=560d216c-d15a-4031-8066-e86ff3b13b9d"
            alt="Moratia Games logo black"
            height="25px"
          />{" "}
        </Col>
        <Col>
          <Row>
            <Col>
              <AiFillFacebook />
            </Col>
            <Col>
              <AiFillInstagram />
            </Col>
          </Row>
          <Row>© COPYRIGHT 2023. ALL RIGHTS RESERVED.</Row>
          <Row>Moratia Games</Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
