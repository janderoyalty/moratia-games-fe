import { React, useState } from "react";
import "./Release.css";
import { Row, Image, Modal, Button } from "react-bootstrap";

const Release = () => {
	const [showModal, setShowModal] = useState(false);
	const [linkToOpen, setLinkToOpen] = useState("");

	const handleLinkClick = (e, link) => {
		e.preventDefault();
		setLinkToOpen(link);
		setShowModal(true);
	};

	const handleConfirm = () => {
		window.open(linkToOpen, "_blank", "noopener,noreferrer");
		setShowModal(false);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<>
			<Row className="content" id="release">
				<Row className="headers-text" id="preorder-top">
					Available Now
				</Row>
				<Row id="release-bottom">
					<Image
						src={
							"https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia_Card_Quest_Games_Base._Game_Cover.png?alt=media&token=78c1896a-355c-4bc9-b441-c357b60109e8"
						}
						alt={
							"Moratia Games image for Kickstarter with outline of person with bow and arrow on hill and Moratia Card Quest Game logo over colorful backgroud"
						}
						rounded
						id="preorder-image"
						onClick={handleLinkClick}
					></Image>
				</Row>
			</Row>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Leaving Our Website</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You are about to leave our website to go to our Shopify store. Do you
					want to continue?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="success" onClick={handleConfirm}>
						Shopify
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Release;
