import React from "react";
import { Link } from "react-router-dom";
import data from "../data";

export default function HomeScreen() {
  return (
    <div>
      <h1>featured product</h1>
      <div className="products">
        {data.products.map((products, index) => {
          return (
            <div className="product" key={products.slug}>
              <Link to={`/product/${products.slug}`}>
                <img src={products.image} alt={products.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${products.slug}`}>
                  <p>{products.name}</p>
                </Link>
                <p>
                  <strong>$ {products.price}</strong>
                </p>
                <button>add to card</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
