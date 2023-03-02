import React from "react";
import "./Races.css";
import Race2 from "./Race2";
import Race3 from "./Race3";
import Race4 from "./Race4";
import Race5 from "./Race5";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const Products = () => {
  return (
    <Carousel className="content" id="races">
      <Carousel.Item>
        <Row className="content" id="race">
          <Col id="race-left" sm={12} md={12} lg={5}>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/race_deruesc.png?alt=media&token=0df771f2-bdfb-4439-8a6b-069d09bd8b41"
              alt="character"
              rounded
              id="race-image"
            ></Image>
          </Col>
          <Col id="race-right" sm={12} md={12} lg={7}>
            <div className="headers-text" id="race-right--top">
              Deru'esc
            </div>
            <div id="race--text-box--entry">
              <div id="race--text-box--entry--header">
                <div
                  className="body-title"
                  id="race--text-box--entry--header--title"
                >
                  Race I
                </div>
              </div>
              <div className="body-text" id="race--text-box--entry--body">
                JANDE: Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry’s
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </div>
            </div>
          </Col>
        </Row>
      </Carousel.Item>
      <Carousel.Item>
        <Race2></Race2>
      </Carousel.Item>
      <Carousel.Item>
        <Race3></Race3>
      </Carousel.Item>
      <Carousel.Item>
        <Race4></Race4>
      </Carousel.Item>
      <Carousel.Item>
        <Race5></Race5>
      </Carousel.Item>
    </Carousel>
  );
};

export default Products;
