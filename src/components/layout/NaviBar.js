import { React, useState } from "react";
import "./NaviBar.css";
import {
	Modal,
	Button,
	Nav,
	Navbar,
	Container,
	NavDropdown,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NaviBar = () => {
	const [showModal, setShowModal] = useState(false);
	const [linkToOpen, setLinkToOpen] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const handleLinkClick = (e, path) => {
		if (location.pathname === path) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	const handleShopClick = (e, link) => {
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

	const handleScrollToSection = (sectionId) => {
		if (location.pathname !== "/") {
			navigate("/");
			// Wait for page navigation to complete
			setTimeout(() => {
				const element = document.getElementById(sectionId);
				if (element) {
					element.scrollIntoView({ behavior: "smooth" });
				}
			}, 300); // Adjust as needed
		} else {
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
			}
		}
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
					<Navbar.Brand
						as={Link}
						to="/"
						onClick={(e) => handleLinkClick(e, "/")}
					>
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
									handleShopClick(e, "https://moratiagames.myshopify.com/")
								}
							>
								Shop
							</Nav.Link>
							<NavDropdown title="Discover" id="discover-dropdown">
								<NavDropdown.Item onClick={() => handleScrollToSection("home")}>
									Home
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => handleScrollToSection("updates")}
								>
									Updates
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => handleScrollToSection("featured")}
								>
									Featured
								</NavDropdown.Item>
								<NavDropdown.Item
									onClick={() => handleScrollToSection("testimonials")}
								>
									Testimonials
								</NavDropdown.Item>
							</NavDropdown>
							<Nav.Link
								as={Link}
								to="/products"
								onClick={(e) => handleLinkClick(e, "/products")}
							>
								Products
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/world"
								onClick={(e) => handleLinkClick(e, "/world")}
							>
								World
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/gallery"
								onClick={(e) => handleLinkClick(e, "/gallery")}
							>
								Gallery
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/about"
								onClick={(e) => handleLinkClick(e, "/about")}
							>
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
