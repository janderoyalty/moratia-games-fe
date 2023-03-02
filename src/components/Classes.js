import React from "react";
import "./Classes.css";
import Class1 from "./Class1";
import Class2 from "./Class2";
import Class3 from "./Class3";
import Class4 from "./Class4";
import Class5 from "./Class5";
import Carousel from "react-bootstrap/Carousel";

const Classes = () => {
  return (
    <Carousel className="content" id="classes" variant="dark">
      <Carousel.Item>
        <Class1></Class1>
      </Carousel.Item>
      <Carousel.Item>
        <Class2></Class2>
      </Carousel.Item>
      <Carousel.Item>
        <Class3></Class3>
      </Carousel.Item>
      <Carousel.Item>
        <Class4></Class4>
      </Carousel.Item>
      <Carousel.Item>
        <Class5></Class5>
      </Carousel.Item>
    </Carousel>
  );
};

export default Classes;
