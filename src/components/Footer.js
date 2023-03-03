import React from "react";
import "./Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="content" id="footer">
      <Row>
        <Col id="footer--left">
          <a href="#home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2FMoratia_Games_logo_white.png?alt=media&token=7006baf5-fa84-4ea3-aed2-62e7182dc95f"
              alt="Moratia Games logo black"
              height="25px"
            />
          </a>
        </Col>
        <Col id="footer-center">
          <div>© COPYRIGHT 2023. ALL RIGHTS RESERVED.</div>
          <div>Moratia Games</div>
          <div>
            Created by{" "}
            <a
              id="footer-link"
              href="https://www.linkedin.com/in/janderoyalty/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jande Royalty
            </a>
          </div>
        </Col>
        <Col>
          <Row>
            <Col id="footer--right">
              <div>
                <a
                  href="https://www.facebook.com/MoratiaGames"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillFacebook size="2em" color="#f9f9ff" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.instagram.com/moratiagames/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <AiFillInstagram size="2em" color="#f9f9ff" />
                </a>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
