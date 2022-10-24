import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Row, Col, Form, Button } from "react-bootstrap";
import "./UpdatesForm.css";

function UpdatesForm() {
  return (
    <Form role="form" className="updates-forms" >
      <Form.Group>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Label>First</Form.Label>
            <Form.Control type="name" placeholder="John" />
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
          <Form.Label>Last</Form.Label>
            <Form.Control type="name" placeholder="Doe" />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Button variant="light" type="submit">
        Submit
      </Button>    </Form>
  );
}

export default UpdatesForm;
