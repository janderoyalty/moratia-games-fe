import React, { useEffect, useState } from "react";
import "./Races.css";

// imports to make carousel with rows and columns
import { Carousel, Row, Col, Image } from "react-bootstrap";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const Races = () => {
	const [moratiaRaces, setMoratiaRaces] = useState([]);
	const racesCollectionRef = collection(db, "races");

	useEffect(() => {
		const getRaces = async () => {
			const racesData = await getDocs(racesCollectionRef);
			setMoratiaRaces(racesData.docs.map((doc) => ({ ...doc.data() })));
		};
		// console.log("races");
		getRaces();
	}, []);

	return (
		<Carousel className="content" id="races">
			{moratiaRaces.map((moratiaRace, index) => {
				return (
					<Carousel.Item key={index}>
						<Row key={moratiaRace.race}>
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
