import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NaviBar.css";

const NaviBar = () => {
  return (
    <>
      <Navbar id="navi-bar" bg="light" variant="light" sticky="top" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2FMoratia_Games_logo_black.png?alt=media&token=359efc0c-c776-4ae7-868a-fde70b4581d1"
              alt="Moratia Games logo black"
              height="25px"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              <Nav.Link href="#updates">Updates</Nav.Link>
              {/* <Nav.Link href="#events">Events</Nav.Link> */}
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#world">World</Nav.Link>
              <Nav.Link href="#races">Races</Nav.Link>
              <Nav.Link href="#classes">Classes</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NaviBar;
