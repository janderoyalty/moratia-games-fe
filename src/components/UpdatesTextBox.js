import React, { useEffect, useState } from "react";
import "./UpdatesTextBox.css";

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

  const moratiaUpdatesSorted = [...moratiaUpdates].sort(
    (a, b) => b.time - a.time
  );

  return (
    <div id="updates--text-box">
      {moratiaUpdatesSorted.map((moratiaUpdatesSorted) => {
        return (
          <div id="updates--text-box--entry">
            <div id="updates--text-box--entry--header">
              <div
                className="body-title"
                id="updates--text-box--entry--header--title"
              >
                {moratiaUpdatesSorted.title}
              </div>
              <div id="updates--text-box--entry--header--date">
                {moratiaUpdatesSorted.date}
              </div>
            </div>
            <div className="body-text" id="updates--text-box--entry--body">
              {moratiaUpdatesSorted.body}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpdatesTextBox;
