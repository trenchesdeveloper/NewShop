import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Card, Col, Image, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);

      setProduct(data);
    };

    fetchProduct();
  }, [match.params.id]);

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go BACK
      </Link>

      <Row className="">
        {/* first column to show product image */}

        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>

        {/* second column to show product details */}

        <Col md={3}>
          <ListGroup variant="flush">
            {/* show product name */}

            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            {/* show rating using the Rating component */}

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>

            {/* show the price */}

            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            {/* show description */}

            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Third column to display add to cart */}

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>

                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock < 1}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
