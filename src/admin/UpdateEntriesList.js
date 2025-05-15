import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
	collection,
	getDocs,
	deleteDoc,
	doc,
	updateDoc,
} from "firebase/firestore";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { TbPencilPlus, TbPencil } from "react-icons/tb";
import { Timestamp } from "firebase/firestore";
import "./UpdateEntriesList.css";
import { useNavigate } from "react-router-dom";

const UpdateEntriesList = () => {
	const [updates, setUpdates] = useState([]);
	const [sortField, setSortField] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");
	const [showModal, setShowModal] = useState(false);
	const [selectedUpdate, setSelectedUpdate] = useState(null);
	const navigate = useNavigate();
	const [editData, setEditData] = useState({
		title: "",
		body: "",
		date: "",
		time: "",
	});

	useEffect(() => {
		const fetchUpdates = async () => {
			const updatesCollection = collection(db, "updates");
			const updatesSnapshot = await getDocs(updatesCollection);
			const updatesList = updatesSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUpdates(updatesList);
		};

		fetchUpdates();
	}, []);

	const handleDelete = async (id) => {
		await deleteDoc(doc(db, "updates", id));
		setUpdates(updates.filter((update) => update.id !== id));
	};

	const handleSort = (field) => {
		if (field === sortField) {
			setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortOrder("asc");
		}
	};

	const sortedUpdates = [...updates].sort((a, b) => {
		if (!a[sortField] || !b[sortField]) return 0;
		if (sortOrder === "asc") {
			return a[sortField].localeCompare(b[sortField]);
		} else {
			return b[sortField].localeCompare(a[sortField]);
		}
	});

	const renderSortIcon = (field) => {
		if (sortField === field) {
			return sortOrder === "asc" ? (
				<FaSortUp className="active-sort-icon" />
			) : (
				<FaSortDown className="active-sort-icon" />
			);
		}
		return <FaSort className="inactive-sort-icon" />;
	};

	const handleEditClick = (update) => {
		setSelectedUpdate(update);
		setEditData({
			title: update.title || "",
			body: update.body || "",
			date: update.date || "",
			time: update.time
				? update.time.toDate().toISOString().substring(11, 16)
				: "",
		});
		setShowModal(true);
	};

	const handleModalChange = (e) => {
		const { name, value } = e.target;
		setEditData({ ...editData, [name]: value });
		console.log(editData);
	};

	const handleModalSave = async () => {
		if (selectedUpdate) {
			const updateRef = doc(db, "updates", selectedUpdate.id);
			await updateDoc(updateRef, {
				title: editData.title,
				body: editData.body,
				date: editData.date,
				time: Timestamp.fromDate(new Date(`${editData.date}T${editData.time}`)),
			});
			const updatedList = updates.map((upd) =>
				upd.id === selectedUpdate.id
					? {
							...upd,
							title: editData.title,
							body: editData.body,
							date: editData.date,
					  }
					: upd
			);
			setUpdates(updatedList);
			setShowModal(false);
			setSelectedUpdate(null);
		}
	};

	return (
		<div className="update-entries-list">
			<h1>Update Entries</h1>
			<Button
				variant="warning"
				onClick={() => navigate("/update")}
				id="add-updates-button"
			>
				<TbPencilPlus /> Add Updates
			</Button>
			<Table striped bordered hover id="update-table">
				<thead>
					<tr>
						<th onClick={() => handleSort("title")}>
							Title {renderSortIcon("title")}
						</th>
						<th onClick={() => handleSort("body")}>
							Body {renderSortIcon("body")}
						</th>
						<th onClick={() => handleSort("date")}>
							Date {renderSortIcon("date")}
						</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{sortedUpdates.map((update) => (
						<tr key={update.id} onClick={() => handleEditClick(update)}>
							<td className="update-title">
								{update.title.length > 50
									? update.title.substring(0, 40) + "..."
									: update.title}
							</td>
							<td className="update-body">
								{update.body.length > 40
									? update.body.substring(0, 40) + "..."
									: update.body}
							</td>
							<td className="update-date">{update.date}</td>
							<td>
								<Button
									variant="primary"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										handleEditClick(update);
									}}
								>
									<TbPencil /> Edit
								</Button>
								<Button
									variant="danger"
									size="sm"
									onClick={(e) => {
										e.stopPropagation();
										handleDelete(update.id);
									}}
									className="ms-2"
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Update</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								name="title"
								value={editData.title}
								onChange={handleModalChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Body</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								name="body"
								value={editData.body}
								onChange={handleModalChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formEditDate">
							<Form.Label>Date</Form.Label>
							<Form.Control
								type="date"
								name="date"
								value={editData.date}
								onChange={handleModalChange}
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Time</Form.Label>
							<Form.Control
								type="time"
								name="time"
								value={editData.time}
								onChange={handleModalChange}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleModalSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default UpdateEntriesList;
