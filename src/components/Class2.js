import React from "react";
import "./Class.css";
import "../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Class1 = () => {
  return (
    <Row className="content" id="class">
      <Col id="class-right" sm={12} md={12} lg={7}>
        <div className="headers-text" id="class-right--top">
          Paladin
        </div>
        <div id="class--text-box--entry">
          <div id="class--text-box--entry--header">
            <div
              className="body-title"
              id="class--text-box--entry--header--title"
            >
              Class 2
            </div>
          </div>
          <div className="body-text" id="class--text-box--entry--body">
            JANDE: Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry’s standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
      </Col>
      <Col id="class-left" sm={12} md={12} lg={5}>
        <Image
          src="https://res.cloudinary.com/dvbdefnwx/image/upload/v1677474678/Moratia%20Images/IMG_4096_rcx9i8.png"
          alt="character"
          rounded
          id="class-image"
        ></Image>
      </Col>
    </Row>
  );
};

export default Class1;
