import React, { useEffect, useState } from "react";
import "./Testimonials.css";
// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const Classes = () => {
  const [moratiaClasses, setMoratiaClasses] = useState([]);
  const classesCollectionRef = collection(db, "classes");

  useEffect(() => {
    const getClasses = async () => {
      const classesData = await getDocs(classesCollectionRef);
      setMoratiaClasses(classesData.docs.map((doc) => ({ ...doc.data() })));
    };
    console.log();
    getClasses();
  }, []);

  return (
    <Carousel className="content" id="classes" variant="dark">
      {moratiaClasses.map((moratiaClass) => {
        return (
          <Carousel.Item>
            <Row className="content" id="class">
              <Col id="class-right" sm={12} md={12} lg={7}>
                <div className="headers-text" id="class-right--top">
                  {moratiaClass.class}
                </div>
                <div id="class--text-box--entry">
                  <div className="body-text" id="class--text-box--entry--body">
                    {moratiaClass.description}
                  </div>
                </div>
              </Col>
              <Col id="class-left" sm={12} md={12} lg={5}>
                <Image
                  src={moratiaClass.url}
                  alt={moratiaClass.class}
                  rounded
                  id="class-image"
                ></Image>
              </Col>
            </Row>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Classes;
