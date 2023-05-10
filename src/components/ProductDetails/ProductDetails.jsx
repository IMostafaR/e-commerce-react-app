import React, { useContext, useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import { productContext } from "../../context/ProductContext";

export default function ProductDetails() {
  let { id } = useParams();

  const [productDetails, setProductDetails] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activeBtnId, setActiveBtnId] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);

  let { addProduct } = useContext(productContext);

  async function getProductDetails() {
    setLoader(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setLoader(false);
  }

  async function addNewProduct(productId) {
    setBtnLoader(true);
    await addProduct(productId);
    setBtnLoader(false);
  }

  useEffect(() => {
    getProductDetails();
    window.scrollTo(0, 0);
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
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {loader ? (
        <Loader />
      ) : (
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
              <button
                onClick={() => {
                  if (!btnLoader) {
                    setActiveBtnId(id);
                    addNewProduct(id);
                  }
                }}
                className="btn bg-main text-white w-100"
              >
                {btnLoader && activeBtnId === id ? (
                  <i className="fa-solid fa-spinner fa-spin-pulse"></i>
                ) : (
                  "+ Add"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
