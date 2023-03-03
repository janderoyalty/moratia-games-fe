import React, { useEffect, useState } from "react";
import "./Races.css";

// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const Races = () => {
  const [moratiaRaces, setMoratiaRaces] = useState([]);
  const racesCollectionRef = collection(db, "races");

  useEffect(() => {
    const getRaces = async () => {
      const racesData = await getDocs(racesCollectionRef);
      setMoratiaRaces(racesData.docs.map((doc) => ({ ...doc.data() })));
    };

    getRaces();
  });

  return (
    <Carousel className="content" id="races">
      {moratiaRaces.map((moratiaRace) => {
        return (
          <Carousel.Item>
            <Row className="content" id="race">
              <Col id="race-left" sm={12} md={12} lg={5}>
                <Image
                  src={moratiaRace.url}
                  alt={moratiaRace.race}
                  rounded
                  id="race-image"
                ></Image>
              </Col>
              <Col id="race-right" sm={12} md={12} lg={7}>
                <div className="headers-text" id="race-right--top">
                  {moratiaRace.race}
                </div>
                <div id="race--text-box--entry">
                  <div className="body-text" id="race--text-box--entry--body">
                    {moratiaRace.description}
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Races;
