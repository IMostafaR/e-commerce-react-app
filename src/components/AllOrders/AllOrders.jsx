import React, { useState, useEffect } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";

import { Helmet } from "react-helmet";

export default function AllOrders({ userData }) {
  const [loader, setLoader] = useState(false);
  const [allOrdersDetails, setAllOrdersDetails] = useState(null);

  async function getAllOrders() {
    setLoader(true);
    if (userData?.id) {
      let { data } = await axios.get(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/user/${userData.id}`
      );
      setAllOrdersDetails(data);
      // console.log(data.totalOrderPrice);
    }
    setLoader(false);
  }

  useEffect(() => {
    getAllOrders();

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
      {loader ? (
        <Loader />
      ) : allOrdersDetails ? (
        <div className="container my-5">
          {allOrdersDetails.map((order) => (
            <div key={order._id} className="my-5 p-5 shadow rounded-5">
              <h5 className="fw-bold">Order ID: #{order.id}</h5>
              <p className="text-muted">Order date: {order.paidAt}</p>
              <hr />
              <div>
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="row align-items-center py-2 px-5 my-2 "
                  >
                    <div className="col-md-1">
                      <div>
                        <img
                          className="img-fluid img-thumbnail"
                          src={item.product.imageCover}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-md-11 d-flex justify-content-between">
                      <div>
                        <p className="fw-blod">
                          {item.product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="font-sm text-main">
                          {item.product.category.name}
                        </p>
                      </div>
                      <div>
                        <p className="fw-bold text-main">{item.price} EGP</p>
                        <p className="font-sm">Quantity: {item.count}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr />
              <div className="row">
                <div className="col-md-6">
                  <h5 className="fw-bold">Total Price</h5>
                  <p className="text-main font-sm">
                    {order.totalOrderPrice} EGP
                  </p>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold">Delivery</h5>
                  <p className="font-sm text-muted">Address</p>
                  <p>{order.shippingAddress.details}</p>
                  <p>{order.shippingAddress.city}</p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
