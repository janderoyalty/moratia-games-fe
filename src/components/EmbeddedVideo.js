import React from "react";
import "./EmbeddedVideo.css";
import "../App.css";
import { Container } from "react-bootstrap";

const EmbeddedVideo = () => {
	return (
		<div className="content" id="video">
			<div className="headers-text">How to Play</div>
			<Container>
				<div class="ratio ratio-16x9">
					<iframe
						src="https://www.youtube.com/embed/eT-IBcP8uoM?si=LZWH3PjHmiSZIJuJ"
						title="How to play Moratia CQG"
						allowFullScreen
					></iframe>
				</div>
			</Container>
		</div>
	);
};

export default EmbeddedVideo;
