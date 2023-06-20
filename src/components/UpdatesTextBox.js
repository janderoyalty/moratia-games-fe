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
      // Remove backslashes before quotation marks
      const formattedUpdates = updates.map((update) => ({
        ...update,
        body: update.body.replace(/\\n/g, "\n").replace(/\\"/g, '"'),
      }));

      setMoratiaUpdates(formattedUpdates);
    };
    getUpdates();
  }, []);

  const moratiaUpdatesSorted = [...moratiaUpdates].sort(
    (a, b) => b.time - a.time
  );

  const addLinkToBodyText = (text) => {
    const urls = {
      "Pre-Launch Kickstarter page":
        "https://www.kickstarter.com/projects/moratiagames/moratia-card-quest-game",
    };

    let wrappedText = text;
    for (const word in urls) {
      const regex = new RegExp(`\\b${word}\\b`, "g");
      const url = urls[word];
      wrappedText = wrappedText.replace(
        regex,
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${word}</a>`
      );
    }

    return wrappedText;
  };

  const renderBodyText = (text) => {
    const bodyTextWithLink = addLinkToBodyText(text);
    const paragraphs = bodyTextWithLink.split("\n");

    return paragraphs.map((paragraph, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
  };

  return (
    <div id="updates--text-box">
      {moratiaUpdatesSorted.map((moratiaUpdatesSorted, index) => (
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
            {renderBodyText(moratiaUpdatesSorted.body)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdatesTextBox;
