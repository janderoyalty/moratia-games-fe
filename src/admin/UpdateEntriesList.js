import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { TbPencilPlus, TbPencil } from "react-icons/tb";
import "./UpdateEntriesList.css";
import { useNavigate } from "react-router-dom";

const UpdateEntriesList = () => {
	const [updates, setUpdates] = useState([]);
	const [sortField, setSortField] = useState("date");
	const [sortOrder, setSortOrder] = useState("desc");
	const navigate = useNavigate();
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
				<FaSortUp style={{ color: "#010203" }} />
			) : (
				<FaSortDown style={{ color: "#010203" }} />
			);
		} else {
			return <FaSort style={{ color: "#ececec" }} />;
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
						<tr key={update.id}>
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
								<Link
									to={`/edit_update/${update.id}`}
									className="btn btn-primary btn-sm me-2"
								>
									<TbPencil /> Edit
								</Link>
								<Button
									variant="danger"
									size="sm"
									onClick={() => handleDelete(update.id)}
								>
									Delete
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default UpdateEntriesList;
