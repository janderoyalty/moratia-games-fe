import React from "react";
import "./UpdatesTextBoxEntry.css";
import { addLinksToText, sanitizeAndSplitText } from "../../utils/textUtils";

const UpdatesTextBoxEntry = ({ update, urls }) => {
	const renderBodyText = (text) => {
		const bodyTextWithLinks = addLinksToText(text, urls);
		const paragraphs = sanitizeAndSplitText(bodyTextWithLinks);

		return paragraphs.map((paragraph, index) => (
			<p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
		));
	};

	return (
		<div id="updates--text-box--entry">
			<div id="updates--text-box--entry--header">
				<div
					className="body-title"
					id="updates--text-box--entry--header--title"
				>
					{update.title}
				</div>
				<div id="updates--text-box--entry--header--date">{update.date}</div>
			</div>
			<div className="body-text" id="updates--text-box--entry--body">
				{renderBodyText(update.body)}
			</div>
		</div>
	);
};

export default UpdatesTextBoxEntry;
