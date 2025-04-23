import React, { useState } from "react";
import "./ContactForm.css";
import { Form, Button } from "react-bootstrap";

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, email, message } = formData;

		// Logic to send email (e.g., using an email service API)
		// For now, we'll just log the data
		console.log(
			`Sending email to info@moratiagames.com with subject: WEBSITE: Message from ${name}`
		);
		console.log(`Email: ${email}`);
		console.log(`Message: ${message}`);

		// Reset form
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<Form onSubmit={handleSubmit} className="contact-form">
			<h2 id="contact-form-title">Send us a message</h2>
			<Form.Group controlId="formName" className="form-group">
				<Form.Label>Name</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter your name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group controlId="formEmail" className="form-group">
				<Form.Label>Email</Form.Label>
				<Form.Control
					type="email"
					placeholder="Enter your email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group controlId="formMessage" className="form-group">
				<Form.Label>Message</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					placeholder="Enter your message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Button variant="primary" type="submit">
				Send Message
			</Button>
		</Form>
	);
};

export default ContactForm;
