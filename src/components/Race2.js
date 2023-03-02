import React from "react";
import "./Race.css";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Race2 = () => {
  return (
    <Row className="content" id="race">
      <Col id="race-left" sm={12} md={12} lg={5}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/race__haetra.png?alt=media&token=e1777e76-7df6-4dc9-af90-b0adf50c068e"
          alt="character"
          rounded
          id="race-image"
        ></Image>
      </Col>
      <Col id="race-right" sm={12} md={12} lg={7}>
        <div className="headers-text" id="race-right--top">
          Haetra
        </div>
        <div id="race--text-box--entry">
          <div id="race--text-box--entry--header">
            <div
              className="body-title"
              id="race--text-box--entry--header--title"
            >
              Race II
            </div>
          </div>
          <div className="body-text" id="race--text-box--entry--body">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Race2;
