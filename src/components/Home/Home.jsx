import React from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

export default function Home() {
  return (
    <>
      <div className="container my-5 ">
        <FeaturedProducts />
      </div>
    </>
  );
}
