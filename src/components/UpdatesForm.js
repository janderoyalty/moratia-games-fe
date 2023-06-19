// import React, { useState } from "react";
// import "./UpdatesForm.css";

// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

// // imports to access Firebase database
// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase-config";

// function UpdatesForm() {
//   const [first, setFirst] = useState("");
//   const [last, setLast] = useState("");
//   const [email, setEmail] = useState("");

//   const mailingListCollectionRef = collection(db, "mailing-list");

//   const addPerson = async () => {
//     console.log("before submit hit");
//     await addDoc(mailingListCollectionRef, {
//       first,
//       last,
//       email,
//     });
//     console.log("submit hit");
//   };

//   return (
//     <Form role="form" className="updates-forms">
//       <Form.Group>
//         <Row>
//           <Col lg={6} md={6} sm={12} xs={12}>
//             <Form.Label>First</Form.Label>
//             <Form.Control
//               type="name"
//               placeholder="John"
//               autoComplete="on"
//               name="first"
//               value={first}
//               onChange={(event) => {
//                 setFirst(event.target.value);
//               }}
//             />
//           </Col>
//           <Col lg={6} md={6} sm={12} xs={12}>
//             <Form.Label>Last</Form.Label>
//             <Form.Control
//               type="name"
//               placeholder="Doe"
//               autoComplete="on"
//               name="last"
//               value={last}
//               onChange={(event) => {
//                 setLast(event.target.value);
//               }}
//             />
//           </Col>
//         </Row>
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           placeholder="Enter email"
//           autoComplete="on"
//           name="email"
//           value={email}
//           onChange={(event) => {
//             setEmail(event.target.value);
//           }}
//         />
//         {/* <Form.Check type="checkbox" label="I agree to receive emails from Moratia Games." /> */}
//         <Form.Text className="text-muted">
//           We'll never share your email with anyone else.
//         </Form.Text>
//       </Form.Group>
//       <Button variant="light" type="submit" onClick={addPerson}>
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default UpdatesForm;

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
    console.log("before submit hit");
    await addDoc(mailingListCollectionRef, {
      first,
      last,
      email,
    });
    console.log("submit hit");
    setFirst("");
    setLast("");
    setEmail("");
  };

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <div className="inputGp">
          <label> First</label>
          <input
            placeholder="John"
            onChange={(event) => {
              setFirst(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Last</label>
          <input
            placeholder="Doe"
            onChange={(event) => {
              setLast(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Email</label>
          <input
            placeholder="john.doe@email.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <button onClick={addPerson}> Submit Post</button>
      </div>
    </div>
  );
}

export default UpdatesForm;
