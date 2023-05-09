import React, { useContext, useEffect, useState } from "react";
import styles from "./Cart.module.css";
import { cartContext } from "../../context/CartContext";
import Loader from "../Loader/Loader";
import { toast } from "react-hot-toast";

export default function Cart() {
  let { getLoggedUserCart, removeCartItem } = useContext(cartContext);

  const [loader, setLoader] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [activeBtnId, setActiveBtnId] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);

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
    // console.log(response.data.data);
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
                          setActiveBtnId(product.product._id);
                          deleteItem(
                            product.product._id,
                            product.product.title
                          );
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
                      <button className="btn bg-main text-white btn-sm">
                        +
                      </button>
                      <span className="mx-2">{product.count}</span>
                      <button className="btn bg-main text-white btn-sm">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <h6 className="text-main my-3">
                Total cart price: {cartDetails.totalCartPrice} EGP
              </h6>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
