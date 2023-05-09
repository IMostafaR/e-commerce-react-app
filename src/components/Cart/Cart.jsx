import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";
import { images } from "../../assets/images";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem, updateCartItemCount, clearCart } =
    useContext(cartContext);

  const [loader, setLoader] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [activeBtnId, setActiveBtnId] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [increaseLoader, setIncreaseLoader] = useState(false);
  const [decreaseLoader, setDecreaseLoader] = useState(false);

  async function getCart() {
    setLoader(true);
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setCartDetails(response.data.data);
    }
    setLoader(false);
  }

  async function deleteItem(productId, removedProduct) {
    setBtnLoader(true);
    let response = await removeCartItem(productId);
    setCartDetails(response.data.data);
    setBtnLoader(false);
    toast.success(
      `${removedProduct
        .split(" ")
        .slice(0, 3)
        .join(" ")} successfully removed from your cart`,
      {
        duration: 4000,
        position: "bottom-right",
        className:
          "text-center border-2 border-success shadow bg-dark text-white font-sm",
      }
    );
  }

  async function updateItemCount(productId, updatedProduct, count, oldCount) {
    if (count > oldCount) {
      setIncreaseLoader(true);
    } else if (count < oldCount) {
      setDecreaseLoader(true);
    }
    let response = await updateCartItemCount(productId, count);
    setCartDetails(response.data.data);
    setIncreaseLoader(false);
    setDecreaseLoader(false);
    toast.success(
      `${updatedProduct
        .split(" ")
        .slice(0, 3)
        .join(" ")} quantity successfully updated`,
      {
        duration: 4000,
        position: "bottom-right",
        className:
          "text-center border-2 border-success shadow bg-dark text-white font-sm",
      }
    );
  }

  async function emptyCart() {
    setBtnLoader(true);
    let response = await clearCart();
    if (response?.data?.message === "success") {
      setCartDetails(null);
    }
    setBtnLoader(false);
  }

  useEffect(() => {
    getCart();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {cartDetails ? (
            <div className="container my-5 bg-main-light p-4 shadow rounded-3">
              <h3 className="text-center fw-bolder">Shop Cart</h3>
              {cartDetails.products.map((product) => (
                <div
                  key={product.product._id}
                  className="row align-items-center border-bottom py-2 my-2"
                >
                  <div className="col-md-1">
                    <img
                      className="img-fluid"
                      src={product.product.imageCover}
                      alt=""
                    />
                  </div>
                  <div className="col-md-11 d-flex justify-content-between">
                    <div>
                      <h6>
                        {product.product.title.split(" ").slice(0, 3).join(" ")}
                      </h6>
                      <h6 className="text-main">Price: {product.price}</h6>
                      <button
                        className="btn m-0 p-0"
                        onClick={() => {
                          if (!btnLoader) {
                            setActiveBtnId(product.product._id);
                            deleteItem(
                              product.product._id,
                              product.product.title
                            );
                          }
                        }}
                      >
                        {btnLoader && activeBtnId === product.product._id ? (
                          <i className="fa-solid fa-spinner fa-spin-pulse text-success me-2"></i>
                        ) : (
                          <i className="fa-regular fa-trash-can text-danger me-2"></i>
                        )}
                        Remove
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => {
                          if (!increaseLoader) {
                            setActiveBtnId(product.product._id);
                            updateItemCount(
                              product.product._id,
                              product.product.title,
                              product.count + 1,
                              product.count
                            );
                          }
                        }}
                        className="btn bg-main text-white btn-sm"
                      >
                        {increaseLoader &&
                        activeBtnId === product.product._id ? (
                          <i className="fa-solid fa-spinner fa-spin-pulse text-white"></i>
                        ) : (
                          "+"
                        )}
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button
                        onClick={() => {
                          if (!decreaseLoader) {
                            setActiveBtnId(product.product._id);
                            updateItemCount(
                              product.product._id,
                              product.product.title,
                              product.count - 1,
                              product.count
                            );
                          }
                        }}
                        className="btn bg-main text-white btn-sm"
                      >
                        {decreaseLoader &&
                        activeBtnId === product.product._id ? (
                          <i className="fa-solid fa-spinner fa-spin-pulse text-white"></i>
                        ) : (
                          "-"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <h6 className="text-main my-3">
                Total cart price: {cartDetails.totalCartPrice} EGP
              </h6>
              <div className="d-flex justify-content-between">
                <button className="btn bg-main">
                  <Link className="text-white" to={"/checkout"}>
                    Checkout <i className="fa-solid fa-cart-shopping ms-2"></i>
                  </Link>
                </button>
                <button
                  onClick={() => {
                    if (!btnLoader) {
                      emptyCart();
                    }
                  }}
                  className="btn bg-danger text-white"
                >
                  Empty Cart
                  {btnLoader ? (
                    <i className="fa-solid fa-spinner fa-spin-pulse ms-2"></i>
                  ) : (
                    <i className="fa-solid fa-trash ms-2"></i>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center my-5 flex-column">
              <h3 className=" h1 text-main fw-bolder">Your cart is empty</h3>
              <img
                className="w-50"
                src={images.emptyCart}
                alt="empty cart gif"
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
