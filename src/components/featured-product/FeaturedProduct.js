import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";
import "./FeaturedProduct.css";
import CachedImage from "../common/CachedImage";

const FeaturedProduct = () => {
	const [showModal, setShowModal] = useState(false);
	const [linkToOpen, setLinkToOpen] = useState("");

	const handleLinkClick = (e, link) => {
		e.preventDefault();
		setLinkToOpen(link);
		setShowModal(true);
	};

	const handleConfirm = () => {
		window.open(linkToOpen, "_blank", "noopener,noreferrer");
		setShowModal(false);
	};

	const handleClose = () => {
		setShowModal(false);
	};

	return (
		<div className="featured-product">
			<Row className="featured-product__container">
				<Col lg={6} className="featured-product__image-container">
					<CachedImage
						src="https://firebasestorage.googleapis.com/v0/b/moratia-games.appspot.com/o/featured_product%2FIMG_2552.PNG?alt=media&token=665f9429-11f1-4102-8411-319a280d2e11"
						alt="Moratia Card Quest Game box cover"
						className="featured-product__image"
						onClick={(e) => handleLinkClick(e, "https://shop.moratiagames.com")}
					/>
				</Col>
				<Col lg={6} className="featured-product__content">
					<h2 className="featured-product__title">Get your copy of</h2>
					<h3 className="featured-product__subtitle">Moratia Card Quest</h3>
					<p className="featured-product__description">
						Experience the adventure of a lifetime with our flagship card game.
						Perfect for game nights with friends and family.
					</p>
					<div className="featured-product__features">
						<ul>
							<li>Strategic gameplay</li>
							<li>Original hand-drawn illustrations</li>
							<li>Easy to learn, hard to master</li>
							<li>2-5 players</li>
						</ul>
					</div>
					<Button
						className="featured-product__cta"
						onClick={(e) => handleLinkClick(e, "https://shop.moratiagames.com")}
					>
						Shop Now
					</Button>
				</Col>
			</Row>

			<Modal show={showModal} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<Modal.Title>Leaving Our Website</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					You are about to leave our website to go to our Shopify store. Do you
					want to continue?
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleConfirm}>
						Continue to Shopify
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default FeaturedProduct;
