import React from "react";
import styles from "./NotFound.module.css";
import { images } from "../../assets/images";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found!</title>
      </Helmet>
      <div className="d-flex flex-column my-5">
        <h1 className="text-center text-main fw-bolder">
          OOPS ! Page Not Found
        </h1>
        <img
          className="w-50 m-auto"
          src={images.error}
          alt="page not found 404"
        />
      </div>
    </>
  );
}
