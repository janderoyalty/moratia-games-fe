import React from "react";
import "./PreOrder.css";
import { Row, Col, Image, Button } from "react-bootstrap";

const PreOrder = () => {
	return (
		<Row className="content" id="preorder">
			<Col
				id="preorder-right"
				xs={{ span: 12, order: 2 }}
				sm={{ span: 12, order: 2 }}
				md={{ span: 12, order: 2 }}
				lg={{ span: 5, order: 1 }}
			>
				<Row id="preorder-right--top">
					<p className="sub-headers" id="preorder-right--top--text">
						Missed the Kickstarter?
					</p>
					<p>
						You can still pre order a first-edition copy of Moratia Card Quest
						Game.
					</p>
					<a
						href="https://moratiacardquestgame.backerkit.com/hosted_preorders"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button variant="light" id="pre-order-button">
							Pre Order Today
						</Button>
					</a>
				</Row>
			</Col>
			<Col
				id="preorder-left"
				xs={{ span: 12, order: 1 }}
				sm={{ span: 12, order: 1 }}
				md={{ span: 12, order: 1 }}
				lg={{ span: 7, order: 2 }}
			>
				<Row className="headers-text" id="preorder-left--top">
					Pre Order
				</Row>
				<Image
					src={
						"https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia%20CQG%20Moratia%20Card%20Quest%20Game%20preorder%20image.png?alt=media&token=a2cbfce9-9702-4e7a-8e2d-17c4fbaba444"
					}
					alt={
						"Moratia Games image for Kickstarter with outline of person with bow and arrow on hill and Moratia Card Quest Game logo over colorful backgroud"
					}
					rounded
					id="preorder-image"
				></Image>
			</Col>
		</Row>
	);
};

export default PreOrder;
