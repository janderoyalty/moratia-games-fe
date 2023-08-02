import React from "react";
import "./AboutUs.css";

// imports to make carousel with rows and columns
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

const AboutUs = () => {
  return (
    <div className="content" id="about-us">
      <Row>
        <Col id="about-us--right" sm={12} md={12} lg={7}>
          <div className="headers-text" id="about-us--right--top">
            Thomas and Jande Royalty
          </div>
          <div id="about-us---text-box--entry">
            <div className="body-text" id="about-us---text-box--entry--body">
              <p>
                MORATIA GAMES, LLC is a fledgling gaming company formed in 2023
                by Thomas and Jande Royalty. We base all of our games in the
                fantasy world of Moratia and all its vast history. We aim to
                bring inclusive games and stories that everyone can enjoy.
              </p>
              <p>
                <b>Thomas (CREATOR & CREATIVE DIRECTOR) </b>was born in the greater Nashville area of middle
                Tennessee. From a young age he proved himself a creative
                individual. That creativity would guide him to various endeavors
                ranging from directing video projects to working for a time as a
                professional artist. Now he has come full circle to focus on
                Moratia, a passion project started when he was only twelve years
                old.
              </p>
              <p>
							<b>Jande (GRAPHIC DESIGN & SOFTWARE ENGINEER) </b> was born in the country of Liberia and moved to the United
                States at an early age. throughout her years she has worked in a
                range of rolls from video editing to graphic design to software
                engineering. She is the practical anchor to Thomas’ creative
                wilds and has played an invaluable role to bringing Moratia to
                the world.
              </p>
            </div>
          </div>
        </Col>
        <Col id="about-us--left" sm={12} md={12} lg={5}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia%20Card%20Quest%20Games%20co-owners%20Jande%20and%20Thomas%20Royalty.jpeg?alt=media&token=ae395cbc-e376-4e04-920e-8c606096f21f"
            alt="Jande and Thomas Royalty in Moratia Games black shirts"
            rounded
            id="about-us--image"
            className="image-size"
          ></Image>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
