import React, { useEffect, useState } from "react";
import "./UpdatesTextBox.css";
import DOMPurify from "dompurify";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const UpdatesTextBox = () => {
	const [moratiaUpdates, setMoratiaUpdates] = useState([]);
	const updatesCollectionRef = collection(db, "updates");
	const [urls, setUrls] = useState({});
	const urlsCollectionRef = collection(db, "urls");

	useEffect(() => {
		const fetchUpdates = async () => {
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

		const fetchUrls = async () => {
			const urlsData = await getDocs(urlsCollectionRef);
			const urlData = urlsData.docs.map((doc) => ({ ...doc.data() }));
			setUrls(urlData);
		};

		fetchUpdates();
		fetchUrls();
	}, []);

	const moratiaUpdatesSorted = [...moratiaUpdates].sort(
		(a, b) => b.time - a.time
	);

	const addLinkToBodyText = (text) => {
		let wrappedText = text;

		for (const indexUrl in urls) {
			const word = urls[indexUrl].name;
			const regex = new RegExp(`\\b${word}\\b`, "g");
			const url = urls[indexUrl].url;
			wrappedText = wrappedText.replace(
				regex,
				`<a href="${url}" target="_blank" rel="noopener noreferrer">${word}</a>`
			);
		}

		return wrappedText;
	};

	const renderBodyText = (text) => {
		const bodyTextWithLink = addLinkToBodyText(text);
		const sanitizedHTML = DOMPurify.sanitize(bodyTextWithLink, {
			ADD_ATTR: ["target"],
		});
		const paragraphs = sanitizedHTML.split("\n");

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
