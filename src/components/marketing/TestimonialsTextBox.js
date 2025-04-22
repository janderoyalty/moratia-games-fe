import React, { useEffect, useState } from "react";
import "./TestimonialsTextBox.css";

// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const TestimonialsTextBox = () => {
	const [moratiaTestimonials, setMoratiaTestimonials] = useState([]);

	useEffect(() => {
		const getTestimonials = async () => {
			const testimonialsCollectionRef = collection(db, "testimonials");
			const testimonialsData = await getDocs(testimonialsCollectionRef);
			setMoratiaTestimonials(
				testimonialsData.docs.map((doc) => ({ ...doc.data() }))
			);
		};

		getTestimonials();
	}, []);

	const moratiaTestimonialsSorted = [...moratiaTestimonials].sort(
		(a, b) => b.name - a.name
	);

	return (
		<Carousel variant="dark" controls={false} indicators={false}>
			{moratiaTestimonialsSorted.map((moratiaTestimonialSorted, index) => {
				return (
					<Carousel.Item id="testimonials" key={index}>
						<Row>
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
