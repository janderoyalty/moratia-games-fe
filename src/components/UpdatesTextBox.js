import React, { useEffect, useState } from "react";
import "./UpdatesTextBox.css";
import UpdatesTextBoxEntry from "./UpdatesTextBoxEntry";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const UpdatesTextBox = () => {
  const [moratiaUpdates, setMoratiaUpdates] = useState([]);
  const updatesCollectionRef = collection(db, "updates");

  useEffect(() => {
    const getUpdates = async () => {
      const updatesData = await getDocs(updatesCollectionRef);
      setMoratiaUpdates(updatesData.docs.map((doc) => ({ ...doc.data() })));
    };

    getUpdates();
    console.log("update");
  }, []);

  return (
    <div id="updates--text-box">
      {moratiaUpdates.map((moratiaUpdate) => {
        return (
          <div id="updates--text-box--entry">
            <div id="updates--text-box--entry--header">
              <div
                className="body-title"
                id="updates--text-box--entry--header--title"
              >
                {moratiaUpdate.title}
              </div>
              <div id="updates--text-box--entry--header--date">
                {moratiaUpdate.date}
              </div>
            </div>
            <div className="body-text" id="updates--text-box--entry--body">
              {moratiaUpdate.body}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpdatesTextBox;
