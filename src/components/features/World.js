import React, { useState } from "react";
import "./World.css";
import WorldText from "../game-info/WorldText";
import Button from "react-bootstrap/Button";
import { Modal } from "react-bootstrap";
import CachedImage from "../common/CachedImage";

const World = () => {
	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	return (
		<div className="content" id="world">
			<Button
				variant="outline-light"
				className="world--map--button"
				onClick={handleShowModal}
			>
				Learn More
			</Button>
			<Modal show={showModal} onHide={handleCloseModal} size="lg">
				<Modal.Header closeButton>
					<Modal.Title className="world-modal-title">
						The World of Moratia
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<WorldText></WorldText>
				</Modal.Body>
			</Modal>
			<div id="world--map">
				<CachedImage
					id="world--map-image"
					src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/world%2FIMG_2590.PNG?alt=media&token=f79015ec-febf-47b9-9ca3-9d97d2d26c08"
					alt="map of the world of Moratia"
				/>
			</div>
		</div>
	);
};

export default World;
