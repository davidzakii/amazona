import React, { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import { Helmet } from "react-helmet-async";
import CheckOutSteps from "../component/CheckOutSteps";
import { useNavigate } from "react-router-dom";

export default function PaymentScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "payPal"
  );
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckOutSteps step1 step2 step3 />
      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="my-3">
            <Form.Check
              type="radio"
              id="payPal"
              label="payPal"
              value="payPal"
              checked={paymentMethodName === "payPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="stripe"
              label="stripe"
              value="stripe"
              checked={paymentMethodName === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <Button type="submit">Continue</Button>
        </Form>
      </div>
    </div>
  );
}
