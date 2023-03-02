import React, { useEffect, useState } from "react";
import "./Products.css";
// imports to make carousel with rows and columns
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
// imports to access Firebase database
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config";

const Products = () => {
  const [moratiaProducts, setMoratiaProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await getDocs(productsCollectionRef);
      setMoratiaProducts(productsData.docs.map((doc) => ({ ...doc.data() })));
    };

    getProducts();
  });

  return (
    <Carousel className="content" id="products">
      {moratiaProducts.map((moratiaProduct) => {
        return (
          <Carousel.Item>
            <Row className="content" id="product">
              <Col id="product-left" sm={12} md={12} lg={5}>
                <Image
                  src={moratiaProduct.url}
                  alt={moratiaProduct.product}
                  rounded
                  id="product-image"
                ></Image>
              </Col>
              <Col id="product-right" sm={12} md={12} lg={7}>
                <div className="headers-text" id="product-right--top">
                  {moratiaProduct.product}
                </div>
                <div id="product--text-box--entry">
                  <div className="body-text" id="product--text-box--entry--body">
                    {moratiaProduct.description}
                  </div>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default Products;
