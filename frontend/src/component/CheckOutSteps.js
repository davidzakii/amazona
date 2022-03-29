import React from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

export default function CheckOutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? "active" : ""}>Sign-In</Col>
      <Col className={props.step2 ? "active" : ""}>Shipping</Col>
      <Col className={props.step3 ? "active" : ""}>payment</Col>
      <Col className={props.step4 ? "active" : ""}>Pace Order</Col>
    </Row>
  );
}
