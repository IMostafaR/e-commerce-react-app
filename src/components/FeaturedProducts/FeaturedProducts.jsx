import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getFeaturedProducts() {
    setLoader(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setFeaturedProducts(data.data);
    setLoader(false);
  }

  useEffect(() => {
    getFeaturedProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="row my-5">
          {featuredProducts.map((product) => (
            <div
              key={product._id}
              className="col-xl-2 col-lg-3 col-md-4 col-sm-6 g-3"
            >
              <div className="product p-4 cursor-pointer shadow rounded-3 overflow-hidden">
                <Link to={product._id}>
                  <img
                    className="img-fluid mb-2"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="text-main font-sm fw-bold">
                    {product.category.name}
                  </span>
                  <h3 className="h6 fw-bolder">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">{product.price} EGP</span>
                    <span className="text-muted">
                      <i className="fas fa-star rating-color me-1"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn bg-main text-white w-100">+ Add</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
