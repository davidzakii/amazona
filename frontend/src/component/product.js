import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { Store } from "../Store";
import axios from "axios";

export default function Product(props) {
  const { products } = props;
  console.log(products);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  console.log(cart);
  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === products._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${products._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, product out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...products, quantity },
    });
  };
  return (
    <Card key={products.slug}>
      <Link to={`/product/${products.slug}`}>
        <img
          src={products.image}
          alt={products.name}
          className="card-img-top"
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${products.slug}`}>
          <Card.Title>{products.name}</Card.Title>
        </Link>
        <Rating rating={products.rating} numReviews={products.numReviews} />
        <Card.Text>$ {products.price}</Card.Text>
        {products.countInStock === 0 ? (
          <Button variant="light" disabled>
            out of stock
          </Button>
        ) : (
          <Button onClick={addToCartHandler}>add to card</Button>
        )}
      </Card.Body>
    </Card>
  );
}
