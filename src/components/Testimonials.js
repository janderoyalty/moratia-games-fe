import React from "react";
import "./Testimonials.css";
import TestimonialsTextBox from "./TestimonialsTextBox";

const Testimonials = () => {
  return (
    <div className="content" id="testimonials">
      <div id="testimonials-container">
        <div className="headers-text" id="testimonials--top">
          Testimonials
        </div>
        <div id="testimonials--bottom">
          <TestimonialsTextBox></TestimonialsTextBox>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
