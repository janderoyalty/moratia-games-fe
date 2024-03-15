import React, { useEffect, useState } from "react";
import "./Classes.css";
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
			{moratiaClasses.map((moratiaClass, index) => {
				return (
					<Carousel.Item key={index}>
						<Row>
							<Col
								id="class-right"
								xs={{ span: 12, order: 2 }}
								sm={{ span: 12, order: 2 }}
								md={{ span: 12, order: 2 }}
								lg={{ span: 7, order: 1 }}
							>
								<div className="headers-text" id="class-right--top">
									{moratiaClass.class}
								</div>
								<div id="class--text-box--entry">
									<div className="body-text" id="class--text-box--entry--body">
										{moratiaClass.description}
									</div>
								</div>
							</Col>
							<Col
								id="class-left"
								xs={{ span: 12, order: 1 }}
								sm={{ span: 12, order: 1 }}
								md={{ span: 12, order: 1 }}
								lg={{ span: 5, order: 2 }}
							>
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
