import React from "react";
import "./Events.css";
import Calendar from "./Calendar";
import UpdatesTextBoxEntry from "./UpdatesTextBoxEntry";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Events = () => {
  return (
    <Row className="content" id="events">
      <Col id="events-left" sm={12} md={12} lg={7} >
        <div className="headers-text" id="events-left--top">
          EVENTS
        </div>
        <div id="events-left--bottom">
          <UpdatesTextBoxEntry></UpdatesTextBoxEntry>
        </div>
      </Col>
      <Col id="events-right" sm={12} md={12} lg={5}>
        <Calendar></Calendar>
      </Col>
    </Row>
  );
};

export default Events;
