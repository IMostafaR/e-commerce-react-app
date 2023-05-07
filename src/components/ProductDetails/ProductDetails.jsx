import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState([]);

  async function getProductDetails() {
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,

    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6">
            <Slider {...settings}>
              {productDetails?.images?.map((image, index) => (
                <div key={index} className="px-2">
                  <img className="img-fluid" src={image} alt="" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-lg-8 col-md-6">
            <h1>{productDetails.title}</h1>
            <p>{productDetails.description}</p>
            <span className="text-main font-sm fw-bold mb-2 d-block">
              {productDetails?.category?.name}
            </span>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">{productDetails.price} EGP</span>
              <span className="text-muted">
                <i className="fas fa-star rating-color me-1"></i>
                {productDetails.ratingsAverage}
              </span>
            </div>
            <button className="btn bg-main text-white w-100">+ Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
