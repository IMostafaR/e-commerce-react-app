import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../context/CartContext";
import styles from "./Checkout.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Checkout() {
  let { onlinePayment, cartId } = useContext(cartContext);
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  async function handleCheckout(values) {
    setBtnLoader(true);
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === "success") {
      console.log(response.data.session.url);
      window.location.href = response.data.session.url;
    }
    setBtnLoader(false);
  }
  let checkoutSchema = Yup.object({
    details: Yup.string().required("Details is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Egyptian phone number only is allowed"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: "",
    },
    validationSchema: checkoutSchema,
    onSubmit: handleCheckout,
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="shadow-card rounded-4 p-5 w-75">
          <h2 className="fw-bold mb-4 text-center">
            Checkout <i className="fa-solid fa-credit-card ms-2 text-main"></i>
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className={
                  formik.errors.details && formik.touched.details
                    ? "form-control border-danger shadow-none"
                    : "form-control"
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.details}
                type="text"
                name="details"
                id="details"
                placeholder="Details"
              />
              {formik.errors.details && formik.touched.details ? (
                <label className="text-danger fw-bold" htmlFor="details">
                  {formik.errors.details}
                </label>
              ) : (
                <label htmlFor="details">Details</label>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                className={
                  formik.errors.city && formik.touched.city
                    ? "form-control border-danger shadow-none"
                    : "form-control"
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                type="text"
                name="city"
                id="city"
                placeholder="City"
              />
              {formik.errors.city && formik.touched.city ? (
                <label className="text-danger fw-bold" htmlFor="city">
                  {formik.errors.city}
                </label>
              ) : (
                <label htmlFor="city">City</label>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                className={
                  formik.errors.phone && formik.touched.phone
                    ? "form-control border-danger shadow-none"
                    : "form-control"
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phone}
                type="tel"
                name="phone"
                id="phone"
                placeholder="Phone"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <label className="text-danger fw-bold" htmlFor="phone">
                  {formik.errors.phone}
                </label>
              ) : (
                <label htmlFor="phone">Phone Number</label>
              )}
            </div>

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type={btnLoader ? "button" : "submit"}
              className="btn bg-main text-white w-100 my-3"
            >
              {btnLoader ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                "Checkout"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
