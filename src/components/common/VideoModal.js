import React from "react";
import EmbeddedVideo from "./EmbeddedVideo";
import { Modal } from "react-bootstrap";

const VideoModal = ({
	showVideo,
	handleCloseVideo,
	name,
	how_to_video_url,
}) => {
	return (
		<>
			<Modal show={showVideo} onHide={handleCloseVideo} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>{name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EmbeddedVideo how_to_video_url={how_to_video_url} name={name} />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default VideoModal;
