import React, { useEffect, useState } from "react";
import "./Products.css";

// imports to make carousel with rows and columns
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase-config";

const Products = () => {
	const [moratiaProducts, setMoratiaProducts] = useState([]);

	useEffect(() => {
		const getProducts = async () => {
			const productsCollectionRef = collection(db, "products");
			const productsData = await getDocs(productsCollectionRef);
			setMoratiaProducts(productsData.docs.map((doc) => ({ ...doc.data() })));
		};
		getProducts();
	}, []);

	return (
		<div className="content" id="products">
			{moratiaProducts.map((moratiaProduct) => {
				return (
					<Row key={moratiaProduct.product}>
						<Col id="product-left" sm={12} md={12} lg={5}>
							<Image
								src={moratiaProduct.url}
								alt={moratiaProduct.product}
								rounded
								id="product-image"
								className="image-size"
							></Image>
						</Col>
						<Col id="product-right" sm={12} md={12} lg={7}>
							<div className="headers-text" id="product-right--top">
								{moratiaProduct.product}
							</div>
							<div id="product--text-box--entry">
								<div className="body-text" id="product--text-box--entry--body">
									{moratiaProduct.description1}
								</div>
								<div className="body-text" id="product--text-box--entry--body">
									{moratiaProduct.description2}
								</div>
							</div>
						</Col>
					</Row>
				);
			})}
		</div>
	);
};

export default Products;
