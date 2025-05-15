import React, { useState, useEffect } from "react";
import AdminDataTable from "./components/AdminDataTable";
import { Button, Modal, Form } from "react-bootstrap";
import {
	collection,
	addDoc,
	Timestamp,
	updateDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./UpdateForm.css";

const URLs = () => {
	const [showAddModal, setShowAddModal] = useState(false);
	const [urlName, setUrlName] = useState("");
	const [urlLink, setUrlLink] = useState("");
	const [items, setItems] = useState([]);
	const [showEditModal, setShowEditModal] = useState(false);
	const [editData, setEditData] = useState({});
	const [editId, setEditId] = useState("");
	const [refreshFlag, setRefreshFlag] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			const colRef = collection(db, "urls");
			const snapshot = await getDocs(colRef);
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setItems(data);
		};
		fetchData();
	}, []);

	const handleAddUrl = async (shouldClose) => {
		try {
			await addDoc(collection(db, "urls"), {
				name: urlName,
				url: urlLink,
				createdAt: Timestamp.now(),
			});
			if (shouldClose) setShowAddModal(false);
			setUrlName("");
			setUrlLink("");
			alert("URL added successfully!");
		} catch (err) {
			console.error("Error adding URL:", err);
			alert("Failed to add URL.");
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
			alert("Document updated.");
			setShowEditModal(false);
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Edit error:", err);
			alert("Failed to update.");
		}
	};

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
		<div style={{ padding: "1rem" }}>
			<h2>Manage URLs</h2>
			<Button variant="success" onClick={() => setShowAddModal(true)}>
				Add New URL
			</Button>

			<Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
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
					<Button variant="secondary" onClick={() => setShowAddModal(false)}>
						Close
					</Button>
					<Button variant="outline-success" onClick={() => handleAddUrl(false)}>
						Save & Add Another
					</Button>
					<Button variant="success" onClick={() => handleAddUrl(true)}>
						Save & Close
					</Button>
				</Modal.Footer>
			</Modal>

			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{Object.entries(editData).map(([key, value]) =>
							key === "id" ||
							key === "createdAt" ||
							key === "updatedAt" ? null : (
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

			<AdminDataTable
				collectionName="urls"
				renderRow={renderRow}
				refreshTrigger={refreshFlag}
			/>
		</div>
	);
};

export default URLs;
