import React, { useState, useRef } from "react";
import "./ContactForm.css";
import { Form, Button } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [captchaValue, setCaptchaValue] = useState(null);

	// ✅ Add ref to track the form DOM
	const formRef = useRef();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleCaptchaChange = (value) => {
		setCaptchaValue(value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!captchaValue) {
			alert("Please complete the CAPTCHA.");
			return;
		}

		emailjs
			.sendForm(
				process.env.REACT_APP_EMAILJS_SERVICE_ID,
				process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
				formRef.current,
				process.env.REACT_APP_EMAILJS_PUBLIC_KEY
			)
			.then((result) => {
				console.log("Message sent!", result.text);
				alert("Message sent!");
			})
			.catch((error) => {
				console.error("Error sending message:", error.text);
				alert("Failed to send message. Please try again.");
			});

		// Reset form fields
		setFormData({ name: "", email: "", message: "" });
	};

	return (
		<Form ref={formRef} onSubmit={handleSubmit} className="contact-form">
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

			<ReCAPTCHA
				sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
				onChange={handleCaptchaChange}
				id="captcha"
			/>

			<Button variant="primary" type="submit">
				Send Message
			</Button>
		</Form>
	);
};

export default ContactForm;
