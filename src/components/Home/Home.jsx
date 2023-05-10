import React from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Fresh Cart Home</title>
      </Helmet>
      <div className="container my-5">
        <MainSlider />
        <CategorySlider />
        <FeaturedProducts />
      </div>
    </>
  );
}
