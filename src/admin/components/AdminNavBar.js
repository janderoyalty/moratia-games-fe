import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../../components/layout/NaviBar.css";

const AdminNavBar = () => {
	const location = useLocation();

	const handleLinkClick = (e, path) => {
		if (location.pathname === path) {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};

	return (
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
						<Nav.Link as={Link} to="/admin/testimonials">
							Testimonials
						</Nav.Link>
						<Nav.Link as={Link} to="/admin/urls">
							URLs
						</Nav.Link>
						<Nav.Link as={Link} to="/admin/updates">
							Updates
						</Nav.Link>
						<Nav.Link as={Link} to="/admin/photos">
							Photos
						</Nav.Link>
						<Nav.Link as={Link} to="/admin/races">
							Races
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default AdminNavBar;
