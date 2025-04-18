import React, { useState } from "react";
import Products from "../components/features/Products";
import EmbeddedVideo from "../components/common/EmbeddedVideo";
import { Modal } from "react-bootstrap";

const InDevelopment = () => {
	return (
		<div className="content" style={{ padding: "2rem", textAlign: "center" }}>
			<h2>More Products Coming Soon!</h2>
			<p>We're working hard to bring you more exciting games and content.</p>
		</div>
	);
};

const ProductsPage = () => {
	const [showVideo, setShowVideo] = useState(false);

	const handleCloseVideo = () => setShowVideo(false);
	const handleShowVideo = () => setShowVideo(true);

	return (
		<>
			<Products />
			<button onClick={handleShowVideo} style={{ margin: "1rem" }}>
				Watch Product Video
			</button>
			<Modal show={showVideo} onHide={handleCloseVideo} size="lg">
				<Modal.Header closeButton>
					<Modal.Title>Product Video</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<EmbeddedVideo />
				</Modal.Body>
			</Modal>
			<InDevelopment />
		</>
	);
};

export default ProductsPage;
