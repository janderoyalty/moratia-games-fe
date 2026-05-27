import React, { useState, useCallback } from "react";
import AdminDataTable from "./components/AdminDataTable";
import { Button, Modal, Form, Table } from "react-bootstrap";
import {
	collection,
	addDoc,
	Timestamp,
	doc,
	updateDoc,
	getDocs,
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

	// Archive modal state
	const [showArchiveModal, setShowArchiveModal] = useState(false);
	const [archivedItems, setArchivedItems] = useState([]);
	const [archiveLoading, setArchiveLoading] = useState(false);

	// Search and sort state
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("az");

	const handleArchiveClick = async (item) => {
		if (!window.confirm("Archive this URL?")) return;
		try {
			await updateDoc(doc(db, "urls", item.id), { isArchived: true });
			setShowEditModal(false);
			setRefreshFlag(prev => prev + 1);
		} catch (err) {
			console.error("Archive error:", err);
			alert("Failed to archive URL.");
		}
	};

	const handleOpenArchive = async () => {
		setArchiveLoading(true);
		setShowArchiveModal(true);
		try {
			const snap = await getDocs(collection(db, "urls"));
			const archived = snap.docs
				.map(d => ({ id: d.id, ...d.data() }))
				.filter(i => i.isArchived === true);
			setArchivedItems(archived);
		} catch (err) {
			console.error("Archive fetch error:", err);
			alert("Failed to load archived URLs.");
			setShowArchiveModal(false);
		} finally {
			setArchiveLoading(false);
		}
	};

	const handleUnarchive = async (item) => {
		try {
			await updateDoc(doc(db, "urls", item.id), { isArchived: false });
			setArchivedItems(prev => prev.filter(i => i.id !== item.id));
			setRefreshFlag(prev => prev + 1);
		} catch (err) {
			console.error("Unarchive error:", err);
			alert("Failed to unarchive URL.");
		}
	};

	const filterAndSort = useCallback(
		(items) => {
			let result = items.filter(i =>
				!i.isArchived &&
				(!searchTerm ||
					i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
					i.url?.toLowerCase().includes(searchTerm.toLowerCase()))
			);
			if (sortOrder === "az") result.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
			else if (sortOrder === "za") result.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
			else if (sortOrder === "newest") result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
			return result;
		},
		[searchTerm, sortOrder]
	);

	const renderRow = (type, item) => {
		if (type === "header") {
			return (
				<>
					<th>URL Text</th>
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
			<div className="d-flex gap-2 align-items-center">
				<Button variant="success" onClick={() => setShowModal(true)}>
					Add New URL
				</Button>
				<Button variant="secondary" onClick={handleOpenArchive}>
					View Archive
				</Button>
			</div>

			<div className="d-flex gap-2 my-3 align-items-center flex-wrap">
				<Form.Control
					type="text"
					placeholder="Search URLs..."
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					style={{ maxWidth: 260 }}
				/>
				<Form.Select
					value={sortOrder}
					onChange={e => setSortOrder(e.target.value)}
					style={{ maxWidth: 180 }}
				>
					<option value="az">A-Z (name)</option>
					<option value="za">Z-A (name)</option>
					<option value="newest">Newest first</option>
				</Form.Select>
			</div>

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
							<Form.Label>URL Text</Form.Label>
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
					{error && <p id="error">{error}</p>}
					{success && <p id="success">{success}</p>}
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
						Cancel
					</Button>
					<Button variant="success" onClick={() => handleAddUrl(true)}>
						Submit
					</Button>
				</Modal.Footer>
			</Modal>

			<AdminDataTable
				collectionName="urls"
				renderRow={renderRow}
				refreshTrigger={refreshFlag}
				processItems={filterAndSort}
			/>

			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit URL</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						{Object.entries(editData).map(([key, value]) =>
							["id", "createdAt", "updatedAt", "isArchived"].includes(key) ? null : (
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
				<Modal.Footer className="d-flex justify-content-between align-items-center">
					<Button variant="warning" onClick={() => handleArchiveClick(editData)}>
						Archive
					</Button>
					<div>
						<Button variant="secondary" className="me-2" onClick={() => setShowEditModal(false)}>
							Cancel
						</Button>
						<Button variant="success" onClick={handleSaveEdit}>
							Save Changes
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			<Modal show={showArchiveModal} onHide={() => setShowArchiveModal(false)} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Archived URLs</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{archiveLoading ? (
						<p>Loading...</p>
					) : archivedItems.length === 0 ? (
						<p>No archived URLs.</p>
					) : (
						<Table striped bordered hover responsive>
							<thead>
								<tr>
									<th>Name</th>
									<th>URL</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{archivedItems.map(item => (
									<tr key={item.id}>
										<td>{item.name}</td>
										<td>
											<a href={item.url} target="_blank" rel="noopener noreferrer">
												{item.url}
											</a>
										</td>
										<td>
											<Button
												variant="outline-success"
												size="sm"
												onClick={() => handleUnarchive(item)}
											>
												Unarchive
											</Button>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowArchiveModal(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default URLs;
