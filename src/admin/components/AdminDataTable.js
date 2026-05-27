import React, { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Table } from "react-bootstrap";
import { db } from "../../firebase-config";
import "../Updates.css";

const AdminDataTable = ({ collectionName, renderRow, refreshTrigger, processItems }) => {
  const [rawItems, setRawItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const colRef = collection(db, collectionName);
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRawItems(data.filter((i) => !i.isArchived));
    };
    fetchData();
  }, [collectionName, refreshTrigger]);

  const items = useMemo(
    () => (processItems ? processItems(rawItems) : rawItems),
    [rawItems, processItems]
  );

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
