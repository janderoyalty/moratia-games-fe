import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Table } from "react-bootstrap";
import { db } from "../../firebase-config";
import "../Updates.css";

const AdminDataTable = ({ collectionName, renderRow, refreshTrigger }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const colRef = collection(db, collectionName);
			const snapshot = await getDocs(colRef);
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setItems(data);
		};
		fetchData();
	}, [collectionName, refreshTrigger]);

	return (
		<Table id="update-table" striped bordered hover responsive>
			<thead>
				<tr>{renderRow("header")}</tr>
			</thead>
			<tbody>
				{items.map((item) => (
					<tr key={item.id}>{renderRow("body", item)}</tr>
				))}
			</tbody>
		</Table>
	);
};

export default AdminDataTable;
