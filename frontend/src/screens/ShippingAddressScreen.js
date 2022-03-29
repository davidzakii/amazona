import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../component/CheckOutSteps";
import { Store } from "../Store";

export default function ShippingAddressScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(shippingAddress.fullName || "");
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [city, setCity] = useState(shippingAddress.city || "");
  const [country, setCountry] = useState(shippingAddress.country || "");
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        postalCode,
        city,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullName,
        address,
        postalCode,
        city,
        country,
      })
    );
    navigate("/payment");
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/signin?redirect=/shipping");
    }
  }, [userInfo, navigate]);
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckOutSteps step1 step2></CheckOutSteps>
      <div className="container small-container">
        <h1 className="my-3">Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="my-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="my-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <div className="my-3">
              <Button variant="primary" type="submit">
                Continue
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
}
