import React, { useState } from "react";
import { db } from "../firebase-config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const UpdateForm = () => {
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [dateInput, setDateInput] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const formatDateString = (date) => {
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
				date: formatDateString(selectedDate), // string
				time: Timestamp.fromDate(selectedDate), // timestamp
			});
			setTitle("");
			setBody("");
			setDateInput("");
			setSuccess("Update submitted successfully!");
		} catch (err) {
			console.error("Submission error:", err);
			setError("Failed to submit update.");
		}
	};

	return (
		<div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
			<h2>Submit Update</h2>
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

				<button type="submit" style={{ padding: "0.75rem 1.5rem" }}>
					Submit Update
				</button>

				{error && <p style={{ color: "red" }}>{error}</p>}
				{success && <p style={{ color: "green" }}>{success}</p>}
			</form>
		</div>
	);
};

export default UpdateForm;
