import { useContext } from "react";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/esm/Card";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../component/MessageBox";
import { Store } from "../Store";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const cartItems = cart.cartItems;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry, product out of stock");
      return;
    }
    ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: "CART_REMOVE_ITEM", payload: { ...item } });
  };
  const checkOutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty{" "}
              <Link to="/" className="ms-3">
                Go Shopping
              </Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center ">
                      <Col md={4}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{" "}
                        <Link to={`/product/${item.slug}`}> {item.name} </Link>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="light"
                          disabled={item.quantity === 0}
                          onClick={() =>
                            updateCartHandler(item, item.quantity - 1)
                          }
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        {"  "}
                        <span>{item.quantity}</span>
                        {"  "}
                        <Button
                          variant="light"
                          disabled={item.quantity === item.countInStock}
                          onClick={() =>
                            updateCartHandler(item, item.quantity + 1)
                          }
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </Col>
                      <Col md={3}>$ {item.price}</Col>
                      <Col md={2}>
                        <Button
                          variant="light"
                          onClick={() => removeItemHandler(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, b) => a + b.quantity, 0)}{" "}
                    item) : $
                    {cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                    onClick={checkOutHandler}
                  >
                    Procced to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
