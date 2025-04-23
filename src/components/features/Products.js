import React, { useEffect, useState } from "react";
import "./Products.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const Products = () => {
	const [moratiaProducts, setMoratiaProducts] = useState([]);
	const productsCollectionRef = collection(db, "products_updated");

	useEffect(() => {
		const getProducts = async () => {
			const productsData = await getDocs(productsCollectionRef);
			const sortedProducts = productsData.docs
				.map((doc) => ({ ...doc.data(), id: doc.id }))
				.sort((a, b) => a.order - b.order);
			setMoratiaProducts(sortedProducts);
		};
		getProducts();
	}, []);

	return (
		<div id="products">
			{moratiaProducts.map((product, index) => {
				const isImageLeft = product.image_left;
				const sectionStyle = {
					backgroundColor: isImageLeft ? "#010203" : "#f9f9f9",
					color: isImageLeft ? "#f9f9f9" : "#010203",
				};
				const isAvailable = product.availability;
				const isHowToVideo = product.is_how_to_video;

				return (
					<div
						className="product-section"
						style={sectionStyle}
						key={product.id}
					>
						<Row className="product-row">
							{isImageLeft && (
								<Col md={6} className="product-image-col">
									<img
										src={product.image_url}
										alt={product.name}
										className="product-image"
									/>
								</Col>
							)}
							<Col md={6} className="product-text-col">
								<h2 className="product-title">{product.name?.toUpperCase()}</h2>
								<p className="product-description">{product.description}</p>

								{isAvailable ? (
									<div className="in-development-product-buttons">
										{isHowToVideo && (
											<Button
												variant="primary"
												href="#video"
												size="xl"
												id="product-how-to-play-button"
											>
												How to Play
											</Button>
										)}
										<Button
											variant="success"
											href={product.shopping_url}
											target="_blank"
											rel="noopener noreferrer"
											size="xl"
											id="product-availability-button"
										>
											Available Now
										</Button>
									</div>
								) : (
									<div className="in-development-product-buttons">
										<Button
											variant="success"
											href={product.shopping_url}
											target="_blank"
											rel="noopener noreferrer"
											size="xl"
											id="product-in-development-button"
										>
											In Development
										</Button>
									</div>
								)}
							</Col>
							{!isImageLeft && (
								<Col md={6} className="product-image-col">
									<img
										src={product.image_url}
										alt={product.name}
										className="product-image"
									/>
								</Col>
							)}
						</Row>
					</div>
				);
			})}
		</div>
	);
};

export default Products;
