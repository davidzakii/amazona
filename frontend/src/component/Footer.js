import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-4">
        <section className="mb-4">
          <Link
            className="btn btn-outline-light btn-floating m-3"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-3"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-3"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-3"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-3"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </Link>

          <Link
            className="btn btn-outline-light btn-floating m-1"
            to="#!"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </Link>
        </section>

        <section className="">
          <form action="">
            <div className="row d-flex justify-content-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our Featured Products</strong>
                </p>
              </div>
              <MDBCol md="5" start="12">
                <MDBInput
                  contrast
                  type="email"
                  placeholder="Enter Your Email"
                  className="mb-4"
                />
              </MDBCol>

              <div className="col-auto">
                <MDBBtn outline color="light" type="submit" className="mb-4">
                  Subscribe
                </MDBBtn>
              </div>
            </div>
          </form>
        </section>
        <MDBRow>
          <div>
            <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
            <div className="d-flex justify-content-around">
              <p>
                <i className="fas fa-home "></i> New York, NY 10012, US
              </p>
              <p>
                <i className="fas fa-envelope  "> </i>
                {"  "}
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone "></i> + 01 234 567 88
              </p>
              <p>
                <i className="fas fa-print"></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </MDBRow>
        <section className="mb-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            distinctio earum repellat quaerat voluptatibus placeat nam, commodi
            optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        <section className=""></section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
  );
}
