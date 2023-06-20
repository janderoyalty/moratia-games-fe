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
      const updates = updatesData.docs.map((doc) => ({ ...doc.data() }));

      // Replace "\\n" sequences with newline characters
      const formattedUpdates = updates.map((update) => ({
        ...update,
        body: update.body.replace(/\\n/g, "\n"),
      }));

      setMoratiaUpdates(formattedUpdates);
    };
    getUpdates();
  }, []);

  const moratiaUpdatesSorted = [...moratiaUpdates].sort(
    (a, b) => b.time - a.time
  );

  const renderBodyText = (body) => {
    const lines = body.split("\n");
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div id="updates--text-box">
      {moratiaUpdatesSorted.map((moratiaUpdatesSorted, index) => {
        return (
          <div id="updates--text-box--entry" key={index}>
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
              {moratiaUpdatesSorted.body.split("\n").map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
              {/* {moratiaUpdatesSorted.body} */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpdatesTextBox;
