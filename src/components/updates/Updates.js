import React from "react";
import "../../App.css";
import "./Updates.css";
import UpdatesForm from "./components/form/UpdatesForm";
import UpdatesTextBox from "./components/textbox/UpdatesTextBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Updates = () => {
	return (
		<Row className="content" id="updates">
			<Col id="updates-left" sm={12} md={12} lg={5}>
				<div className="headers-text" id="updates-left--top">
					Updates
				</div>
				<div className="sub-headers" id="updates-left--middle">
					Get the latest news
				</div>
				<div id="updates-left--bottom">
					<UpdatesForm />
				</div>
			</Col>
			<Col id="updates-right" sm={12} md={12} lg={7}>
				<UpdatesTextBox />
			</Col>
		</Row>
	);
};

export default Updates;
