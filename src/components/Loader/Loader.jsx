import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <span class={styles.loader}></span>
      </div>
    </>
  );
}
