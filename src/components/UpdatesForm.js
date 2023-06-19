import React, { useState } from "react";
import "./UpdatesForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// imports to access Firebase database
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";

function UpdatesForm() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const mailingListCollectionRef = collection(db, "mailing-list");

  const addPerson = async () => {
    await addDoc(mailingListCollectionRef, {
      first,
      last,
      email,
    });
  };

  // handle change event
  const handleFirstChange = (event) => {
    setFirst(event.target.value);
  };

  const handleLastChange = (event) => {
    setLast(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    addPerson();
    event.preventDefault(); // This prevents the page from refreshing on submit
    // alert(`You submitted: ${first}`);
  };

  return (
    <Form onSubmit={handleSubmit} role="form" className="updates-forms">
      <Form.Group>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Label>First</Form.Label>
            <Form.Control
              placeholder="John"
              autoComplete="on"
              value={first}
              type="name"
              onChange={handleFirstChange}
            />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Label>Last</Form.Label>
            <Form.Control
              placeholder="Doe"
              autoComplete="on"
              value={last}
              type="name"
              onChange={handleLastChange}
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          placeholder="john.doe@email.com"
          autoComplete="on"
          value={email}
          type="name"
          onChange={handleEmailChange}
        />
      </Form.Group>

      <Button variant="light" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UpdatesForm;
