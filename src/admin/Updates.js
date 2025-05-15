import React, { useState } from "react";
import AdminDataTable from "./components/AdminDataTable";
import { Button, Modal, Form } from "react-bootstrap";
import {
	collection,
	addDoc,
	updateDoc,
	doc,
	Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { TbPencilPlus } from "react-icons/tb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Updates.css";

const Updates = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [title, setTitle] = useState("");
	const [body, setBody] = useState("");
	const [url, setUrl] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const [showEditModal, setShowEditModal] = useState(false);
	const [editData, setEditData] = useState({});
	const [editId, setEditId] = useState("");
	const [refreshFlag, setRefreshFlag] = useState(0);

	const formatDateString = (date) =>
		new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

	const handleAddUpdate = async () => {
		try {
			await addDoc(collection(db, "updates"), {
				title,
				body,
				url,
				date: formatDateString(startDate),
				time: Timestamp.fromDate(startDate),
				createdAt: Timestamp.now(),
			});
			setSuccess("Update submitted!");
			setTitle("");
			setBody("");
			setUrl("");
			setStartDate(new Date());
			setShowAddModal(false);
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Add update error:", err);
			setError("Failed to submit update.");
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
			const itemRef = doc(db, "updates", editId);
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

	const renderRow = (type, item) => {
		if (type === "header") {
			return (
				<>
					<th>Title</th>
					<th>Body</th>
					<th>Date</th>
					<th>Actions</th>
				</>
			);
		}
		return (
			<>
				<td>{item.title}</td>
				<td>{item.body?.substring(0, 40)}...</td>
				<td>{item.date}</td>
				<td>
					<Button
						variant="primary"
						size="sm"
						onClick={() => handleEditClick(item)}
					>
						Edit
					</Button>
				</td>
			</>
		);
	};

	return (
		<div className="update-entries-list">
			<h1>Update Entries</h1>
			<Button
				variant="warning"
				onClick={() => setShowAddModal(true)}
				id="add-updates-button"
			>
				<TbPencilPlus /> Add Update
			</Button>

			<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Add a New Update</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="form-group">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</Form.Group>
						<Form.Group className="form-group">
							<Form.Label>Date</Form.Label>
							<div>
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									showTimeSelect
									dateFormat="MMMM d, yyyy h:mm aa"
									placeholderText="Pick date & time"
									inline
								/>
							</div>
						</Form.Group>
						<Form.Group className="form-group">
							<Form.Label>Body</Form.Label>
							<Form.Control
								as="textarea"
								rows={6}
								value={body}
								onChange={(e) => setBody(e.target.value)}
								required
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowAddModal(false)}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleAddUpdate}>
						Submit Update
					</Button>
				</Modal.Footer>
			</Modal>

			<AdminDataTable
				collectionName="updates"
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
										type="text"
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

export default Updates;
