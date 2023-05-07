import React from "react";
import styles from "./Footer.module.css";
import { images } from "../../assets/images";

export default function Footer() {
  return (
    <>
      <footer className="py-5 bg-main-light">
        <div className="container">
          <h3>Get the FreshCart app</h3>
          <p>
            We will send you a link, open it on your phone to download the app.{" "}
          </p>
          <div className="row my-3 g-3">
            <div className="col-xl-10 col-lg-9 col-md-8 col-sm-6">
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
              />
            </div>
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <button type="submit" className="btn bg-main text-white w-100 ">
                Share App Link
              </button>
            </div>
          </div>
          <div className="row border-top border-bottom py-2">
            <div className="col-lg-6">
              <div className="my-3 d-flex">
                <p className="fw-bolder m-0">Payment Partners</p>
                <div>
                  <img className="w-25" src={images.amazonPay} alt="" />
                </div>
                <div>
                  <img className="w-25" src={images.americanExpress} alt="" />
                </div>
                <div>
                  <img className="w-25" src={images.mastercard} alt="" />
                </div>
                <div>
                  <img className="w-25" src={images.paypal} alt="" />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="my-3 d-flex align-items-center">
                <p className="fw-bolder m-0">Get deliveries with FreshCart</p>
                <div>
                  <img src={images.appStore} alt="" />
                </div>
                <div>
                  <img className="w-25" src={images.googlePlay} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
