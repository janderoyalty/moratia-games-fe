import React from "react";
import "./Races.css";
import RacesSlider from "./RacesSlider";

const Races = () => {
	return (
		<div className="content" id="races">
			<h2 id="races-title">Races</h2>
			<RacesSlider />
		</div>
	);
};

export default Races;
