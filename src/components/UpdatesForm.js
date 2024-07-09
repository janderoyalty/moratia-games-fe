import React, { useState, useEffect } from "react";
import "./UpdatesForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// imports to access Firebase database
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function UpdatesForm() {
	const [formValues, setFormValues] = useState({
		first: "",
		last: "",
		email: "",
	});

	const [thankYouMessage, setThankYouMessage] = useState({
		message: "",
	});

	const [submitted, setSubmitted] = useState(false);
	const mailingListCollectionRef = collection(db, "mailing-list");

	const addPerson = async () => {
		await addDoc(mailingListCollectionRef, {
			...formValues,
		});
	};

	// HANDLES CHANGES
	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormValues((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setSubmitted(true);
		addPerson();

		// Submit the data to Mailchimp
		const mailchimpUrl =
			"https://moratiagames.us13.list-manage.com/subscribe/post?u=55c445b81f715ee416ea573c4&id=4cae9f164b&f_id=00c920eaf0";
		const mailchimpData = new URLSearchParams();
		mailchimpData.append("EMAIL", formValues.email);
		mailchimpData.append("FNAME", formValues.first);
		mailchimpData.append("LNAME", formValues.last);
		mailchimpData.append("tags", "6685660");

		try {
			await fetch(mailchimpUrl, {
				method: "POST",
				body: mailchimpData,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				mode: "no-cors", // This prevents CORS errors but suppresses response handling
			});
		} catch (error) {
			console.error("Error submitting to Mailchimp", error);
		}
	};

	useEffect(() => {
		if (submitted) {
			setFormValues({
				first: "",
				last: "",
				email: "",
			});
			setThankYouMessage({
				message:
					"You have been added to our email list. Thank you for your support.",
			});
			setSubmitted(false);
		}
	}, [submitted]);

	return (
		<Form onSubmit={handleSubmit} role="form" className="updates-forms">
			<Form.Group>
				<Row>
					<Col lg={6} md={6} sm={12} xs={12}>
						<Form.Label>First</Form.Label>
						<Form.Control
							placeholder="John"
							autoComplete="on"
							name="first"
							value={formValues.first}
							type="text"
							onChange={handleInputChange}
						/>
					</Col>
					<Col lg={6} md={6} sm={12} xs={12}>
						<Form.Label>Last</Form.Label>
						<Form.Control
							placeholder="Doe"
							autoComplete="on"
							name="last"
							value={formValues.last}
							type="text"
							onChange={handleInputChange}
						/>
					</Col>
				</Row>
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					placeholder="john.doe@email.com"
					autoComplete="on"
					name="email"
					value={formValues.email}
					type="email"
					onChange={handleInputChange}
				/>
			</Form.Group>
			<Row>
				<Form.Text className="text-success">
					{thankYouMessage.message}
				</Form.Text>
			</Row>
			<Button variant="light" type="submit">
				Submit
			</Button>
		</Form>
	);
}

export default UpdatesForm;
