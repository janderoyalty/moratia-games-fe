import { React, useState } from "react";
import "./NaviBar.css";
import { Modal, Button } from "react-bootstrap";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NaviBar = () => {
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
			<Navbar
				id="navi-bar"
				bg="light"
				variant="light"
				sticky="top"
				expand="lg"
				collapseOnSelect="true"
				role="navigation"
			>
				<Container fluid>
					<Navbar.Brand as={Link} to="/">
						<img
							src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2FMoratia_Games_logo_black.png?alt=media&token=359efc0c-c776-4ae7-868a-fde70b4581d1"
							alt="Moratia Games logo black"
							height="25px"
						/>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="navbarScroll" />
					<Navbar.Collapse id="navbarScroll">
						<Nav className="ms-auto my-2 my-lg-0" navbarScroll>
							<Nav.Link
								id="shopify-button"
								onClick={(e) =>
									handleLinkClick(e, "https://moratiagames.myshopify.com/")
								}
							>
								Shop
							</Nav.Link>
							<Nav.Link as={Link} to="/">
								Home
							</Nav.Link>
							<Nav.Link as={Link} to="/products">
								Products
							</Nav.Link>
							<Nav.Link as={Link} to="/world">
								World
							</Nav.Link>
							<Nav.Link as={Link} to="/gallery">
								Gallery
							</Nav.Link>
							<Nav.Link as={Link} to="/about">
								About
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
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

export default NaviBar;
