import React from "react";
import "./RaceTextBox.css";
import RaceTextBoxEntry from "./RaceTextBoxEntry";

const RaceTextBox = () => {
  return (
    <div id="race--text-box--entry">
      <div id="race--text-box--entry--header">
        <div className="body-title" id="race--text-box--entry--header--title">Title</div>
        <div id="race--text-box--entry--header--date">Date</div>
      </div>
      <div className="body-text" id="race--text-box--entry--body">
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </div>
    </div>
  );
};

export default RaceTextBox;
