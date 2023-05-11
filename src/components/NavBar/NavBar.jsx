import React, { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import styles from "./NavBar.module.css";
import { images } from "../../assets/images";
import { Link } from "react-router-dom";

export default function NavBar({ userData, logOut }) {
  let { numOfCartItems, animateCart } = useContext(cartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-main-light sticky-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={images.logo} alt="Fresh Cat Logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userData !== null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="products">
                    Products
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link className="nav-link" to="categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="brands">
                    Brands
                  </Link>
                </li> */}
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userData !== null ? (
                <li className="nav-item mx-3 mb-3 mb-md-auto">
                  <Link to="/profile" className="nav-link px-2">
                    <span className="position-relative">
                      <i className="fa-solid fa-user fa-lg"></i>
                      <span className="badge-profile text-dark position-absolute fw-bold rounded-bill">
                        {userData.name}
                      </span>
                    </span>
                  </Link>
                </li>
              ) : null}
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-linkedin mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>

              {userData === null ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item position-relative">
                    <Link className="nav-link px-3" to="cart">
                      <i className="fas fa-shopping-cart fa-lg"></i>
                      <span
                        className={`badge text-white position-absolute top-0 end-0 ${
                          animateCart ? "fa-bounce bg-danger" : "bg-main"
                        }`}
                      >
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link px-2 text-danger"
                      onClick={logOut}
                    >
                      Logout
                      <i className="fa-solid fa-arrow-right-from-bracket mx-2"></i>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
