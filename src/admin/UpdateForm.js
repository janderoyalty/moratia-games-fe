import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import UpdatesTextBoxEntry from "../components/updates/components/textbox/UpdatesTextBoxEntry";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const UpdateForm = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [url, setUrl] = useState("");
	const [dateInput, setDateInput] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const formatDateString = (dateStr) => {
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
			const selectedDate = new Date(dateInput);
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
		setDateInput("");
	};

	// Preview object for UpdatesTextBoxEntry
	const update = {
		id: "preview-id",
		title,
		body,
		date: formatDateString(dateInput || new Date()),
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

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
			<h2>Submit Update</h2>
			<Button
				variant="warning"
				onClick={() => navigate("/update_list")}
				style={{ marginTop: "1rem" }}
			>
				View Updates List
			</Button>
			<form onSubmit={handleSubmit}>
				<label>Title</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
				/>

				<label>Date</label>
				<input
					type="date"
					value={dateInput}
					onChange={(e) => setDateInput(e.target.value)}
					required
					style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
				/>

				<label>Body</label>
				<textarea
					value={body}
					onChange={(e) => setBody(e.target.value)}
					required
					rows={6}
					style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
				/>

				<label>URL (optional)</label>
				<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
				/>

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
