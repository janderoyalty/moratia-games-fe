import React from "react";
import "./Release.css";
import { Row, Col, Image, Button } from "react-bootstrap";

const Release = () => {
	return (
		<Row className="content" id="release">
			<Row className="headers-text" id="preorder-top">
				Releasing July 15, 2024
			</Row>
			<Row id="release-bottom">
				<Image
					src={
						"https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/Moratia_Card_Quest_Games_Base._Game_Cover.png?alt=media&token=78c1896a-355c-4bc9-b441-c357b60109e8"
					}
					alt={
						"Moratia Games image for Kickstarter with outline of person with bow and arrow on hill and Moratia Card Quest Game logo over colorful backgroud"
					}
					rounded
					id="preorder-image"
				></Image>
			</Row>
		</Row>
	);
};

export default Release;
