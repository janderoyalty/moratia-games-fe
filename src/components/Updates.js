import React from "react";
import "./Updates.css";
import "../App.css";
import UpdatesForms from "./UpdatesForm";
import UpdatesTextBox from "./UpdatesTextBox";

const Updates = () => {
  return (
    <div className="content" id="updates">
      <div id="updates-left">
        <div className="headers-text" id="updates-left--top">
          Updates
        </div>
        <div id="updates-left--middle">Get the latest news</div>
        <div id="updates-left--bottom">
          <UpdatesForms></UpdatesForms>
        </div>
      </div>
      <div id="updates-right">
        <UpdatesTextBox></UpdatesTextBox>
      </div>
    </div>
  );
};

export default Updates;
