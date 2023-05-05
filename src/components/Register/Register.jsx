import React, { useState } from "react";
// import styles from "./Register.module.css";
import { useFormik } from "formik";
import ShowPassword from "../ShowPassword/ShowPassword";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  let navigate = useNavigate();
  const [loader, setloader] = useState("second");

  const [passwordType, setPasswordType] = useState("password");

  async function handleRegister(values) {
    let { data } = await axios.post(
      `https://route-ecommerce.onrender.com/api/v1/auth/signup`,
      values
    );

    if (data.message === "success") {
      navigate("/login");
    }
  }

  let userSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name cannot be less than 3 letters")
      .max(10, "Name cannot be more than 10 letters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^01[0125][0-9]{8}$/, "Egyptian phone number only is allowed"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Start with an uppercase letter and be followed by 5 to 10 lowercase letters or digits."
      ),
    rePassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Password doesn't match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: userSchema,
    onSubmit: handleRegister,
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="shadow-card rounded-4 p-5">
          <h2 className="fw-bold mb-4 text-center">Register Now</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
              {formik.errors.name && formik.touched.name ? (
                <label className="text-danger fw-bold" htmlFor="name">
                  {formik.errors.name}
                </label>
              ) : (
                <label htmlFor="name">Name</label>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email ? (
                <label className="text-danger fw-bold" htmlFor="email">
                  {formik.errors.email}
                </label>
              ) : (
                <label htmlFor="email">Email</label>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                className="form-control"
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
            <div className="row">
              <div className="col-md 6">
                <div className="form-floating mb-4">
                  <input
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    type={passwordType}
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <label className="text-danger fw-bold" htmlFor="password">
                      {formik.errors.password}
                    </label>
                  ) : (
                    <label htmlFor="password">Password</label>
                  )}
                </div>
              </div>
              <div className="col-md 6">
                <div className="form-floating mb-4">
                  <input
                    className="form-control"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.rePassword}
                    type={passwordType}
                    name="rePassword"
                    id="rePassword"
                    placeholder="Confirm Password"
                  />
                  {formik.errors.rePassword && formik.touched.rePassword ? (
                    <label className="text-danger fw-bold" htmlFor="rePassword">
                      {formik.errors.rePassword}
                    </label>
                  ) : (
                    <label htmlFor="rePassword">Confirm Password</label>
                  )}
                </div>
              </div>
            </div>

            <ShowPassword
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
              className="btn bg-main text-white w-100 my-3"
            >
              Register
            </button>
          </form>
          <p className="mb-0">
            You have an account? <span> </span>
            <Link className="user-log fw-bold text-decoration-none" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
