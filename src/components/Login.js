import React from "react";
import "./Login.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Login = (props) => {
  return (
    <div className="content" id="login">
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
                    {/* <Button variant="primary" onClick={handleCloseModal}> */}
                      Sign Out
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
    </div>
  );
};

export default Login;
