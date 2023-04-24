import React, { useEffect, useState } from "react";
import "./TestimonialsTextBox.css";

// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const TestimonialsTextBox = () => {
  const [moratiaTestimonials, setMoratiaTestimonials] = useState([]);
  const testimonialsCollectionRef = collection(db, "testimonials");

  useEffect(() => {
    const getTestimonials = async () => {
      const testimonialsData = await getDocs(testimonialsCollectionRef);
      setMoratiaTestimonials(
        testimonialsData.docs.map((doc) => ({ ...doc.data() }))
      );
    };

    getTestimonials();
    console.log("update");
  }, []);

  const moratiaTestimonialsSorted = [...moratiaTestimonials].sort(
    (a, b) => b.name - a.name
  );

  return (
    <Carousel variant="dark" indicators="false" controls="false" hover="false">
      {moratiaTestimonialsSorted.map((moratiaTestimonialSorted) => {
        return (
          <Carousel.Item id="testimonials">
            <Row id="class">
              <Col>
                <div id="testimonials--text-box--quote">
                  {moratiaTestimonialSorted.quote}
                </div>
                <div id="testimonials--text-box--person-name">
                  {moratiaTestimonialSorted.name}
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default TestimonialsTextBox;
