import React from "react";
import "./Updates.css";
import "../App.css";
import UpdatesForms from "./UpdatesForm";
import UpdatesTextBox from "./UpdatesTextBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Updates = () => {
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
          <UpdatesForms></UpdatesForms>
        </div>
      </Col>
      <Col id="updates-right" sm={12} md={12} lg={7}>
        <UpdatesTextBox></UpdatesTextBox>
      </Col>
    </Row>
  );
};

export default Updates;
