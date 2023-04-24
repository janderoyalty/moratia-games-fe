import React, { useEffect, useState } from "react";
import "./TestimonialsTextBox.css";

// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

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
    <Carousel variant="dark">
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
  // return (
  //   <Carousel className="content" id="classes" variant="dark">

  //   <div id="testimonials--text-box">
  //     {moratiaTestimonialsSorted.map((moratiaTestimonialsSorted) => {
  //       return (
  //         <div id="testimonials--text-box">
  //           <div id="testimonials--text-box--quote">
  //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //             eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
  //             enim ad minim veniam, quis nostrud exercitation ullamco laboris
  //             nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
  //             reprehenderit in voluptate velit esse cillum dolore eu fugiat
  //             nulla pariatur.
  //           </div>
  //           <div id="testimonials--text-box--person-name">Person A.</div>
  //         </div>
  //       );
  //     })}
  //   </div>
  //   </Carousel>

  // );
};

export default TestimonialsTextBox;
