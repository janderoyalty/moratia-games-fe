import React from "react";
import EmbeddedVideo from "./EmbeddedVideo";
import { Modal } from "react-bootstrap";

const VideoModal = ({ showVideo, handleCloseVideo }) => {
	return (
		<>
			<Modal show={showVideo} onHide={handleCloseVideo} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Product Video</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EmbeddedVideo />
				</Modal.Body>
			</Modal>
		</>
	);
};

export default VideoModal;
