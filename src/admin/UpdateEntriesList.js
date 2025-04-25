import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import "./UpdateEntriesList.css";

const UpdateEntriesList = () => {
	const [updates, setUpdates] = useState([]);
	const [sortOrder, setSortOrder] = useState("desc");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUpdates = async () => {
			const snapshot = await getDocs(collection(db, "updates"));
			const updatesData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setUpdates(updatesData);
		};
		fetchUpdates();
	}, []);

	const sortedUpdates = [...updates].sort((a, b) => {
		if (sortOrder === "asc") {
			return new Date(a.time.seconds * 1000) - new Date(b.time.seconds * 1000);
		} else {
			return new Date(b.time.seconds * 1000) - new Date(a.time.seconds * 1000);
		}
	});

	return (
		<div className="update-entries-list">
			<h2>All Updates</h2>
			<Button
				variant="warning"
				onClick={() => navigate("/update")}
				style={{ marginTop: "1rem" }}
			>
				Add Updates
			</Button>
			<Button
				variant="secondary"
				onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
			>
				Sort by Date ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
			</Button>
			<Table striped bordered hover id="update-table">
				<thead>
					<tr>
						<th>Title</th>
						<th>Body</th>
						<th>Date</th>
						<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{sortedUpdates.map((update) => (
						<tr key={update.id} className="update-entry">
							<td className="update-title">
								{update.title}
							</td>
							<td className="update-body">{update.body.substring(0, 40)}...</td>
							<td className="update-date">
								{update.time.toDate().toLocaleDateString()}
							</td>
							<td>
								<Button
									variant="warning"
									onClick={() => navigate(`/edit/${update.id}`)}
									className="edit-button"
								>
									Edit
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
