import React from "react";
import styles from "./Profile.module.css";
import { Helmet } from "react-helmet";
import { images } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";

export default function Profile({ userData, setUserData }) {
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="shadow-card rounded-4 p-5">
          <div className="d-flex justify-content-center">
            <img
              className="w-25 mb-2"
              src={images.avatar}
              alt="profile avatar"
            />
          </div>
          <h3 className="mb-3 text-center text-success mb-4 pb-2">
            {userData?.name}
          </h3>
          <div>
            <p>
              <Link className="text-main fw-bold" to="/allorders">
                My orders
              </Link>
            </p>
            <p className="text-danger">
              <Link className="text-danger" onClick={logOut}>
                Logout
                <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
