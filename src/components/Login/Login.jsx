import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import ShowPassword from "../ShowPassword/ShowPassword";
import { Link } from "react-router-dom";

export default function Login() {
  const [passwordType, setPasswordType] = useState("password");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // onSubmit: handleRegister,
  });

  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="shadow-card rounded-4 p-5">
          <h2 className="fw-bold mb-3 text-center">Log In</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <input
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.password}
                type={passwordType}
                name="password"
                id="password"
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <ShowPassword
              passwordType={passwordType}
              setPasswordType={setPasswordType}
            />

            <button
              id="login"
              type="submit"
              className="btn bg-main text-white w-100 my-3"
            >
              Login
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
