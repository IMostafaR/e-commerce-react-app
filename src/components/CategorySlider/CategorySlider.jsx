import React, { useEffect, useState } from "react";
import styles from "./CategorySlider.module.css";
import Slider from "react-slick";
import axios from "axios";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    let { data } = await axios.get(
      `https://route-ecommerce-app.vercel.app/api/v1/categories`
    );
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="px-2 mt-5">
            <img
              height={200}
              width={"100%"}
              className="rounded-3 mb-2 shadow cursor-pointer"
              src={category.image}
              alt={category.name}
            />
            <h3 className="h6 text-center mb-0">{category.name}</h3>
          </div>
        ))}
      </Slider>
    </>
  );
}
