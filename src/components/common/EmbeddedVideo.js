import React from "react";
import "../../App.css";
import { Container } from "react-bootstrap";

const EmbeddedVideo = ({ how_to_video_url, name }) => {
	return (
		<div className="content" id="video">
			<div className="headers-text">How to Play</div>
			<Container>
				<div className="ratio ratio-16x9">
					<iframe
						src={how_to_video_url}
						title={`How to play video for ${name}`}
						allowFullScreen
					></iframe>
				</div>
			</Container>
		</div>
	);
};

export default EmbeddedVideo;
