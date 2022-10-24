import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../images/Moratia_Games_black_logo.png";
import "./NaviBar.css";

const NaviBar = () => {
  return (
    <>
      <Navbar id="navi-bar" bg="light" variant="light" sticky="top" expand="sm">
        <Container>
          <Navbar.Brand href="#home">
            <img src={logo} alt="Moratia Games logo black" height="25px" />{" "}
          </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="#updates">Updates</Nav.Link>
            <Nav.Link href="#events">Events</Nav.Link>
            <Nav.Link href="#gallery">Gallery</Nav.Link>
            <Nav.Link href="#world">World</Nav.Link>
            <Nav.Link href="#races">Races</Nav.Link>
            <Nav.Link href="#classes">Classes</Nav.Link>
            <Nav.Link href="#products">Products</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NaviBar;
