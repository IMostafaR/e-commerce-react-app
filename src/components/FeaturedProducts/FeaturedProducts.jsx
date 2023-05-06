import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  async function getFeaturedProducts() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setFeaturedProducts(data.data);
  }

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <>
      <div className="row">
        {featuredProducts.map((product) => (
          <div key={product._id} className="col-md-3 g-3">
            <div className="product">
              <span>{product.subcategory.name}</span>
              <h3 className="h6 fw-bolder">
                {product.title.split(" ").slice(0, 2).join(" ")}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
