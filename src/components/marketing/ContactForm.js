import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import "./ContactForm.css";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const ContactForm = () => {
	const formRef = useRef();
	const recaptchaRef = useRef(null);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [recaptchaVerified, setRecaptchaVerified] = useState(false);
	const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle' | 'success' | 'error'

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleRecaptchaChange = (value) => {
		setRecaptchaVerified(!!value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!recaptchaVerified) return;

		emailjs
			.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
			.then(() => {
				setSubmissionStatus("success");
				setFormData({ name: "", email: "", message: "" });
			})
			.catch(() => {
				setSubmissionStatus("error");
			});
	};

	const handleResetForm = () => {
		setSubmissionStatus("idle");
		setRecaptchaVerified(false);
		if (recaptchaRef.current) {
			recaptchaRef.current.reset();
		}
	};

	return (
		<Form ref={formRef} onSubmit={handleSubmit} className="contact-form">
			{submissionStatus === "success" && (
				<div className="submission-message-container">
					<h3 className="submission-message success">
						Thank you for contacting us. We will respond promptly.
					</h3>
					<Button
						className="reset-button"
						variant="primary"
						onClick={handleResetForm}
					>
						Okay
					</Button>
				</div>
			)}

			{submissionStatus === "error" && (
				<div className="submission-message-container">
					<h3 className="submission-message error">
						An error occurred while sending your message. Please try again.
					</h3>
					<Button
						className="reset-button"
						variant="primary"
						onClick={handleResetForm}
					>
						Try Again
					</Button>
				</div>
			)}

			{submissionStatus === "idle" && (
				<>
					<h2 id="contact-form-title">Send us a message</h2>
					<Form.Group className="form-group">
						<Form.Label controlId="formName">Name</Form.Label>
						<Form.Control
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter your name"
							required
						/>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label controlId="formEmail">Email</Form.Label>
						<Form.Control
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							required
						/>
					</Form.Group>
					<Form.Group className="form-group">
						<Form.Label controlId="formMessage">Message</Form.Label>
						<Form.Control
							as="textarea"
							name="message"
							rows={5}
							value={formData.message}
							placeholder="Enter your message"
							onChange={handleChange}
							required
						/>
					</Form.Group>
					<div className="recaptcha-container">
						<ReCAPTCHA
							ref={recaptchaRef}
							sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
							onChange={handleRecaptchaChange}
							id="captcha"
						/>
					</div>
					<Button
						variant="primary"
						type="submit"
						disabled={!recaptchaVerified}
						className="contact-form-button"
					>
						Send Message
					</Button>
				</>
			)}
		</Form>
	);
};

export default ContactForm;
