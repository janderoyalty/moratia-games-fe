import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/Moratia_Games_black_logo.png";
import "./NaviBar.css";

const NaviBar = () => {
  return (
    <>
      <Navbar id="navi-bar" bg="light" variant="light" sticky="top" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Moratia Games logo black" height="25px" />{" "}
          </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              // style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#updates">Updates</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#world">World</Nav.Link>
              <Nav.Link href="#races">Races</Nav.Link>
              <Nav.Link href="#classes">Classes</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Navbar id="navi-bar" bg="light" variant="light" sticky="top" expand="md">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Moratia Games logo black" height="25px" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Nav.Link href="#updates">Updates</Nav.Link>
              <Nav.Link href="#events">Events</Nav.Link>
              <Nav.Link href="#gallery">Gallery</Nav.Link>
              <Nav.Link href="#world">World</Nav.Link>
              <Nav.Link href="#races">Races</Nav.Link>
              <Nav.Link href="#classes">Classes</Nav.Link>
              <Nav.Link href="#products">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </>
  );
};

export default NaviBar;
