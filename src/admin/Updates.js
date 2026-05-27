import React, { useState, useCallback } from "react";
import AdminDataTable from "./components/AdminDataTable";
import { Button, Modal, Form, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
	collection,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	getDocs,
	Timestamp,
} from "firebase/firestore";
import { db } from "../firebase-config";
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
	const [editDate, setEditDate] = useState(new Date());
	const [refreshFlag, setRefreshFlag] = useState(0);

	const [showArchiveModal, setShowArchiveModal] = useState(false);
	const [archivedItems, setArchivedItems] = useState([]);
	const [archiveLoading, setArchiveLoading] = useState(false);

	// Delete-with-confirmation state
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [deleteTarget, setDeleteTarget] = useState(null);
	const [deletePhrase, setDeletePhrase] = useState("");

	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("newest");

	const formatDateString = (date) =>
		new Date(date).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});

	const handleAddUpdate = async () => {
		setError("");
		setSuccess("");

		if (!title || !body || !startDate) {
			setError("Please fill in all required fields.");
			return;
		}

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
			setRefreshFlag((prev) => prev + 1);
			setShowAddModal(false);
		} catch (err) {
			console.error("Add update error:", err);
			setError("Failed to submit update.");
		}
	};

	const handleEditClick = (item) => {
		setEditId(item.id);
		setEditData({ ...item });
		setEditDate(item.time?.toDate ? item.time.toDate() : new Date());
		setShowEditModal(true);
	};

	const handleArchiveClick = async (item) => {
		if (!window.confirm("Archive this update?")) return;
		try {
			await updateDoc(doc(db, "updates", item.id), { isArchived: true });
			setShowEditModal(false);
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Archive error:", err);
			alert("Failed to archive update.");
		}
	};

	const handleEditChange = (e) => {
		const { name, value } = e.target;
		setEditData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSaveEdit = async () => {
		try {
			const itemRef = doc(db, "updates", editId);
			await updateDoc(itemRef, {
				title: editData.title,
				body: editData.body,
				date: formatDateString(editDate),
				time: Timestamp.fromDate(editDate),
				updatedAt: Timestamp.now(),
			});
			setShowEditModal(false);
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Update error:", err);
			alert("Failed to update.");
		}
	};

	const handleOpenArchive = async () => {
		setArchiveLoading(true);
		setShowArchiveModal(true);
		try {
			const snap = await getDocs(collection(db, "updates"));
			const archived = snap.docs
				.map((d) => ({ id: d.id, ...d.data() }))
				.filter((i) => i.isArchived === true);
			setArchivedItems(archived);
		} catch (err) {
			console.error("Archive fetch error:", err);
			alert("Failed to load archived updates.");
			setShowArchiveModal(false);
		} finally {
			setArchiveLoading(false);
		}
	};

	const handleUnarchive = async (item) => {
		try {
			await updateDoc(doc(db, "updates", item.id), { isArchived: false });
			setArchivedItems((prev) => prev.filter((i) => i.id !== item.id));
			setRefreshFlag((prev) => prev + 1);
		} catch (err) {
			console.error("Unarchive error:", err);
			alert("Failed to unarchive update.");
		}
	};

	const handleDeleteClick = (item) => {
		setDeleteTarget(item);
		setDeletePhrase("");
		setShowDeleteConfirm(true);
	};

	const expectedDeletePhrase = deleteTarget
		? `I want to delete ${(deleteTarget.title || "").substring(0, 5)}`
		: "";

	const handleConfirmDelete = async () => {
		try {
			await deleteDoc(doc(db, "updates", deleteTarget.id));
			setArchivedItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
			setRefreshFlag((prev) => prev + 1);
			setShowDeleteConfirm(false);
			setDeleteTarget(null);
		} catch (err) {
			console.error("Delete error:", err);
			alert("Failed to delete update.");
		}
	};

	const filterAndSort = useCallback(
		(items) => {
			let result = items.filter(
				(i) =>
					!i.isArchived &&
					(!searchTerm ||
						i.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
						i.body?.toLowerCase().includes(searchTerm.toLowerCase()))
			);
			if (sortOrder === "newest")
				result.sort((a, b) => (b.time?.seconds || 0) - (a.time?.seconds || 0));
			else if (sortOrder === "oldest")
				result.sort((a, b) => (a.time?.seconds || 0) - (b.time?.seconds || 0));
			else if (sortOrder === "az")
				result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
			return result;
		},
		[searchTerm, sortOrder]
	);

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
				<td>
					{item.body
						? item.body.length > 40
							? item.body.substring(0, 40) + "…"
							: item.body
						: ""}
				</td>
				<td>{item.date}</td>
				<td>
					<Button
						variant="primary"
						size="sm"
						className="me-2"
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
			<h1>Manage Entries</h1>

			{/* Action buttons */}
			<div className="admin-actions">
				<Button
					variant="success"
					onClick={() => setShowAddModal(true)}
					id="add-updates-button"
				>
					Add Update
				</Button>
				<Button variant="secondary" onClick={handleOpenArchive}>
					View Archive
				</Button>
			</div>

			{/* Search / Sort toolbar */}
			<div className="admin-toolbar">
				<Form.Control
					type="text"
					placeholder="Search updates…"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="admin-search"
				/>
				<Form.Select
					value={sortOrder}
					onChange={(e) => setSortOrder(e.target.value)}
					className="admin-sort"
				>
					<option value="newest">Newest first</option>
					<option value="oldest">Oldest first</option>
					<option value="az">A–Z (title)</option>
				</Form.Select>
			</div>

			{/* ── Add Update Modal ── */}
			<Modal
				show={showAddModal}
				onHide={() => {
					setShowAddModal(false);
					setError("");
					setSuccess("");
				}}
			>
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
							<div className="datepicker-wrapper">
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
					{error && <p style={{ color: "red" }}>{error}</p>}
					{success && <p style={{ color: "green" }}>{success}</p>}
					<Button
						variant="secondary"
						onClick={() => {
							setShowAddModal(false);
							setError("");
							setSuccess("");
						}}
					>
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
				processItems={filterAndSort}
			/>

			{/* ── Edit Modal ── */}
			<Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
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
								value={editData.title || ""}
								onChange={handleEditChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Body</Form.Label>
							<Form.Control
								as="textarea"
								rows={6}
								name="body"
								value={editData.body || ""}
								onChange={handleEditChange}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Date &amp; Time</Form.Label>
							<div className="datepicker-wrapper">
								<DatePicker
									selected={editDate}
									onChange={(date) => setEditDate(date)}
									showTimeSelect
									dateFormat="MMMM d, yyyy h:mm aa"
									inline
								/>
							</div>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer className="d-flex justify-content-between align-items-center">
					<Button
						variant="warning"
						onClick={() => handleArchiveClick(editData)}
					>
						Archive
					</Button>
					<div>
						<Button
							variant="secondary"
							className="me-2"
							onClick={() => setShowEditModal(false)}
						>
							Cancel
						</Button>
						<Button variant="success" onClick={handleSaveEdit}>
							Save Changes
						</Button>
					</div>
				</Modal.Footer>
			</Modal>

			{/* ── Archive Modal ── */}
			<Modal
				show={showArchiveModal}
				onHide={() => setShowArchiveModal(false)}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>Archived Updates</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{archiveLoading ? (
						<p>Loading…</p>
					) : archivedItems.length === 0 ? (
						<p>No archived updates.</p>
					) : (
						<Table striped bordered hover size="sm" responsive>
							<thead>
								<tr>
									<th>Title</th>
									<th>Body</th>
									<th>Date</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{archivedItems.map((item) => (
									<tr key={item.id}>
										<td style={{ whiteSpace: "nowrap" }}>
											<OverlayTrigger
												placement="top"
												overlay={
													<Tooltip className="archive-tooltip">
														{item.title}
													</Tooltip>
												}
											>
												<span className="archive-hover-text">{item.title}</span>
											</OverlayTrigger>
										</td>
										<td className="archive-preview text-muted small">
											<OverlayTrigger
												placement="top"
												overlay={
													<Tooltip className="archive-tooltip">
														{item.body || "—"}
													</Tooltip>
												}
											>
												<span className="archive-hover-text">
													{item.body
														? item.body.length > 80
															? item.body.substring(0, 80) + "…"
															: item.body
														: "—"}
												</span>
											</OverlayTrigger>
										</td>
										<td style={{ whiteSpace: "nowrap" }}>{item.date}</td>
										<td>
											<div className="archive-actions">
												<Button
													variant="outline-success"
													size="sm"
													onClick={() => handleUnarchive(item)}
												>
													Unarchive
												</Button>
												<Button
													variant="outline-danger"
													size="sm"
													onClick={() => handleDeleteClick(item)}
												>
													Delete
												</Button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</Table>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowArchiveModal(false)}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>

			{/* ── Delete Confirmation Modal ── */}
			<Modal
				show={showDeleteConfirm}
				onHide={() => setShowDeleteConfirm(false)}
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Permanently Delete?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className="mb-2">
						This will <strong>permanently delete</strong> this update and cannot
						be undone.
					</p>
					<p className="mb-1">To confirm, type exactly:</p>
					<p className="mb-3">
						<code>{expectedDeletePhrase}</code>
					</p>
					<Form.Control
						type="text"
						value={deletePhrase}
						onChange={(e) => setDeletePhrase(e.target.value)}
						placeholder="Type the phrase above…"
						autoFocus
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						onClick={() => setShowDeleteConfirm(false)}
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						disabled={deletePhrase !== expectedDeletePhrase}
						onClick={handleConfirmDelete}
					>
						Delete Forever
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Updates;
