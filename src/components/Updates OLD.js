import React from "react";
import "./Updates.css";
import "../App.css";
import UpdatesForms2 from "./UpdatesForm OLD";
import UpdatesTextBox from "./UpdatesTextBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Updates2 = () => {
  return (
    <Row className="content" id="updates">
      <Col id="updates-left" sm={12} md={12} lg={5}>
        <div className="headers-text" id="updates-left--top">
          Updates
        </div>
        <div className="sub-headers" id="updates-left--middle">
          Get the latest news
        </div>
        <div id="updates-left--bottom">
          <UpdatesForms2></UpdatesForms2>
        </div>
      </Col>
      <Col id="updates-right" sm={12} md={12} lg={7}>
        <UpdatesTextBox></UpdatesTextBox>
      </Col>
    </Row>
  );
};

export default Updates2;
