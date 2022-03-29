import React, { useEffect, useReducer } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Product from "../component/product";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import ControlledCarousel from "../component/ControlledCarousel";
// import { getError } from "../utils";
// import data from "../data";
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  //const [products, setProducts] = useState([]);
  const [{ error, loading, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FFETCH_REQUEST" });
        const result = await axios.get("/api/product");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //setProducts(result.data);
    };
    fetchData();
  }, []);
  console.log(products);
  return (
    <div>
      <Helmet>
        <title>Amazona</title>
      </Helmet>
      <ControlledCarousel />
      <h1>featured product</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product, index) => {
              return (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product products={product} />
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}
