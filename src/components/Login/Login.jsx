import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import ShowPassword from "../ShowPassword/ShowPassword";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();

  const [btnLoader, setBtnLoader] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  useEffect(() => window.scrollTo(0, 0), []);

  async function handleLogin(values) {
    setBtnLoader(true);
    let { data } = await axios
      .post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signin`, values)
      .catch((err) => {
        setBtnLoader(false);
        setMsgError(`${err.response.data.message}`);
      });

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setBtnLoader(false);
      navigate("/");
    }
  }

  let userSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <Helmet>
        <title>Fresh Cart Login</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="shadow-card rounded-4 p-5">
          <h2 className="fw-bold mb-3 text-center">Log In</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className={
                  (formik.errors.email && formik.touched.email) || msgError
                    ? "form-control border-danger shadow-none"
                    : "form-control"
                }
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
            <div className="form-floating mb-4">
              <input
                className={
                  (formik.errors.password && formik.touched.password) ||
                  msgError
                    ? "form-control border-danger shadow-none"
                    : "form-control"
                }
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

            <ShowPassword
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />

            {msgError ? (
              <div className="alert alert-danger my-3">{msgError}</div>
            ) : null}

            <button
              disabled={!(formik.isValid && formik.dirty)}
              type={btnLoader ? "button" : "submit"}
              className="btn bg-main text-white w-100 my-3"
            >
              {btnLoader ? (
                <i className="fa-solid fa-spinner fa-spin-pulse"></i>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mb-0">
            Don't have an account?
            <span> </span>
            <Link
              className="user-log fw-bold text-decoration-none"
              to="/register"
            >
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
