import React, { useState } from "react";
import AdminDataTable from "./components/AdminDataTable";
import { Button, Modal, Form } from "react-bootstrap";
import {
	collection,
	addDoc,
	Timestamp,
	doc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./UpdateForm.css";

const URLs = () => {
	const [showModal, setShowModal] = useState(false);
	const [urlName, setUrlName] = useState("");
	const [urlLink, setUrlLink] = useState("");
	const [refreshFlag, setRefreshFlag] = useState(0);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [showEditModal, setShowEditModal] = useState(false);
	const [editData, setEditData] = useState({});
	const [editId, setEditId] = useState("");

	const renderRow = (type, item) => {
		if (type === "header") {
			return (
				<>
					<th>Name</th>
					<th>URL</th>
					<th>Actions</th>
				</>
			);
		}
		return (
			<>
				<td>{item.name}</td>
				<td>
					<a href={item.url} target="_blank" rel="noopener noreferrer">
						{item.url}
					</a>
				</td>
				<td>
					{
						<Button
							variant="primary"
							size="sm"
							onClick={() => handleEditClick(item)}
						>
							Edit
						</Button>
					}
				</td>
			</>
		);
	};

	const handleAddUrl = async (shouldClose) => {
		setError("");
		setSuccess("");

		if (!urlName.trim() || !urlLink.trim()) {
			setError("Both Name and URL are required.");
			return;
		}

		try {
			await addDoc(collection(db, "urls"), {
				name: urlName,
				url: urlLink,
				createdAt: Timestamp.now(),
			});

			setSuccess("URL added successfully!");
			setUrlName("");
			setUrlLink("");
			setRefreshFlag((prev) => prev + 1);

			if (shouldClose) {
				setShowModal(false);
			}
		} catch (err) {
			console.error("Error adding URL:", err);
			setError("Failed to add URL.");
		}
	};

	const handleEditClick = (item) => {
		setEditId(item.id);
		setEditData({ ...item });
		setShowEditModal(true);
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveEdit = async () => {
		try {
			const itemRef = doc(db, "urls", editId);
			await updateDoc(itemRef, {
				...editData,
				updatedAt: Timestamp.now(),
			});
			setShowEditModal(false);
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update.");
		}
	};

	return (
		<div className="update-entries-list">
			<h1>Manage URLs</h1>
			<Button variant="success" onClick={() => setShowModal(true)}>
				Add New URL
			</Button>

			<Modal
				show={showModal}
				onHide={() => {
					setShowModal(false);
					setUrlName("");
					setUrlLink("");
					setError("");
					setSuccess("");
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>Add a New URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="form-group">
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								value={urlName}
								onChange={(e) => setUrlName(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="form-group">
							<Form.Label>URL</Form.Label>
							<Form.Control
								type="text"
								value={urlLink}
								onChange={(e) => setUrlLink(e.target.value)}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<div>
						<Button
							variant="secondary"
							onClick={() => {
								setShowModal(false);
								setUrlName("");
								setUrlLink("");
								setError("");
								setSuccess("");
							}}
						>
							Close
						</Button>
						<Button
							variant="outline-success"
							onClick={() => handleAddUrl(false)}
						>
							Save & Add Another
						</Button>
						<Button variant="success" onClick={() => handleAddUrl(true)}>
							Save & Close
						</Button>
					</div>
					{error && <p id="error">{error}</p>}
					{success && <p id="success">{success}</p>}
				</Modal.Footer>
			</Modal>

			<AdminDataTable
				collectionName="urls"
				renderRow={renderRow}
				refreshTrigger={refreshFlag}
			/>
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Update</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{Object.entries(editData).map(([key, value]) =>
							["id", "createdAt", "updatedAt"].includes(key) ? null : (
								<Form.Group className="mb-3" key={key}>
									<Form.Label>{key}</Form.Label>
									<Form.Control
										type={key === "url" ? "url" : "text"}
										name={key}
										value={value}
										onChange={handleEditChange}
									/>
								</Form.Group>
							)
						)}
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowEditModal(false)}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleSaveEdit}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default URLs;
