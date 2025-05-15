import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import UpdatesTextBoxEntry from "../components/updates/components/textbox/UpdatesTextBoxEntry";
import Button from "react-bootstrap/Button";
import { FaTable } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UpdateForm.css";
import Modal from "react-bootstrap/Modal";
const UpdateForm = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [showModal, setShowModal] = useState(false);
	const [urlName, setUrlName] = useState("");
	const [urlLink, setUrlLink] = useState("");

	const formatDateString = (dateStr) => {
		console.log("dateStr", dateStr);
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");

		try {
			const selectedDate = startDate;
			await addDoc(collection(db, "updates"), {
				title,
				body,
				date: formatDateString(selectedDate),
				time: Timestamp.fromDate(selectedDate),
			});
			setSuccess("Update submitted successfully!");
		} catch (err) {
			console.error("Submission error:", err);
			setError("Failed to submit update.");
		}
	};

	const clearForm = () => {
		setTitle("");
		setBody("");
		setUrl("");
		setStartDate(new Date());
	};

	// Preview object for UpdatesTextBoxEntry
	const update = {
		id: "preview-id",
		title,
		body,
		date: formatDateString(startDate),
	};

	const navigate = useNavigate();

	const urls = url
		? [
				{
					name: "Preview Link",
					url: url,
				},
		  ]
		: [];

	const handleAddUrl = async () => {
		try {
			await addDoc(collection(db, "urls"), {
				name: urlName,
				url: urlLink,
				createdAt: Timestamp.now(),
			});
			setShowModal(false);
			setUrlName("");
			setUrlLink("");
			alert("URL added successfully!");
		} catch (err) {
			console.error("Error adding URL:", err);
			alert("Failed to add URL.");
		}
	};

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
			<h2>Submit Update</h2>
			<Button
				variant="primary"
				onClick={() => setShowModal(true)}
				style={{ marginBottom: "1rem" }}
			>
				Add URL
			</Button>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add a New URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="form-group">
						<label>Name</label>
						<input
							type="text"
							value={urlName}
							onChange={(e) => setUrlName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>URL</label>
						<input
							type="text"
							value={urlLink}
							onChange={(e) => setUrlLink(e.target.value)}
						/>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
					<Button variant="success" onClick={handleAddUrl}>
						Save URL
					</Button>
				</Modal.Footer>
			</Modal>

			<Button
				variant="warning"
				onClick={() => navigate("/update_list")}
				style={{ marginTop: "1rem" }}
			>
				<FaTable /> Updates List
			</Button>
			<form onSubmit={handleSubmit}>
				<div className="form-group" id="title-container">
					<label>Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>

				<div className="form-group" id="date-picker-container">
					<label>Date</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => {
							console.log("JANDE", date);
							setStartDate(date);
						}}
						showTimeSelect
						dateFormat="MMMM d, yyyy h:mm aa"
						placeholderText="Pick date & time"
						className="form-control"
						inline
						isClearable
					/>
				</div>

				<div className="form-group" id="body-container">
					<label>Body</label>
					<textarea
						value={body}
						onChange={(e) => setBody(e.target.value)}
						required
						rows={6}
					/>
				</div>
				<div className="form-group" id="url-container">
					<label>URL (optional)</label>
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
				</div>

				<Button type="submit" style={{ padding: "0.75rem 1.5rem" }}>
					Submit Update
				</Button>

				{error && <p style={{ color: "red" }}>{error}</p>}
				{success && (
					<div>
						<p style={{ color: "green" }}>{success}</p>
						<UpdatesTextBoxEntry update={update} urls={urls} />
						<Button
							variant="danger"
							onClick={() => {
								clearForm();
								setSuccess("");
							}}
						>
							Clear Form
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};

export default UpdateForm;
