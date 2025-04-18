import DOMPurify from "dompurify";

export const addLinksToText = (text, urls) => {
	let processedText = text;

	for (const url of urls) {
		const word = url.name;
		const regex = new RegExp(`\\b${word}\\b`, "g");
		processedText = processedText.replace(
			regex,
			`<a href="${url.url}" target="_blank" rel="noopener noreferrer">${word}</a>`
		);
	}

	return processedText;
};

export const sanitizeAndSplitText = (text) => {
	const sanitizedHTML = DOMPurify.sanitize(text, {
		ADD_ATTR: ["target"],
	});
	return sanitizedHTML.split("\n");
};
