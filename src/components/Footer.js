import React, { useState } from "react";
import "./Footer.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Footer = (props) => {
  // const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => setShowModal(false);
  // const handleShowModal = () => setShowModal(true);

  return (
    <div className="content" id="footer">
      <Row>
        <Col id="footer--left">
          <a href="#home">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/logos%2FMoratia_Games_logo_white.png?alt=media&token=7006baf5-fa84-4ea3-aed2-62e7182dc95f"
              alt="Moratia Games logo black"
              height="25px"
            />
          </a>
        </Col>
        <Col id="footer-center">
          <div>© COPYRIGHT 2023. ALL RIGHTS RESERVED.</div>
          <div>Moratia Games</div>
          <div>
            Created by{" "}
            <a
              className="footer-link"
              href="https://www.linkedin.com/in/janderoyalty/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jande Royalty
            </a>
          </div>

          {/* LOGIN + MODAL */}
          <div>
            <div className="footer-link" onClick={props.handleShowModal}>
              Login
            </div>

            <Modal show={props.showModal} onHide={props.handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title id="modal-title">For Authorized Persons Only</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    {/* <Form.Label>Email address</Form.Label> */}
                    <Form.Control type="email" placeholder="Enter email" />
                    {/* <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text> */}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group> */}
                  <div id="modal-form-login-buttons">
                    <Button variant="primary" onClick={props.handleCloseModal}>
                      Sign Out
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={props.handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
        <Col id="footer--right">
          <Row>
            <Col>
              <a
                href="https://www.facebook.com/MoratiaGames"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillFacebook size="2em" color="#f9f9ff" />
              </a>

              <a
                href="https://www.instagram.com/moratiagames/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillInstagram size="2em" color="#f9f9ff" />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
