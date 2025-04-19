import React from "react";
import "./UpdatesTextBox.css";
import UpdatesTextBoxEntry from "./UpdatesTextBoxEntry";
import { useUpdates } from "../../hooks/useUpdates";

const UpdatesTextBox = () => {
	const { updates, urls, isLoading, error } = useUpdates();

	if (isLoading) {
		return <div>Loading updates...</div>;
	}

	if (error) {
		return <div>Error loading updates: {error}</div>;
	}

	return (
		<div id="updates--text-box">
			{updates.map((update) => (
				<UpdatesTextBoxEntry key={update.id} update={update} urls={urls} />
			))}
		</div>
	);
};

export default UpdatesTextBox;
