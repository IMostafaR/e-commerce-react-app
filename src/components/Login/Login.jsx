import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import ShowPassword from "../ShowPassword/ShowPassword";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  async function handleLogin(values) {
    setLoader(true);
    let { data } = await axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setLoader(false);
        setMsgError(`${err.response.data.message}`);
      });

    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      setLoader(false);
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
              type={loader ? "button" : "submit"}
              className="btn bg-main text-white w-100 my-3"
            >
              {loader ? (
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
