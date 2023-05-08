import React from "react";
import styles from "./MainSlider.module.css";
import { images } from "../../assets/images";
import Slider from "react-slick";

export default function MainSlider() {
  let settingsMain = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  let settingsSide = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-md-9">
          <Slider {...settingsMain}>
            <img height={400} className="w-100" src={images.slider1} alt="" />
            <img height={400} className="w-100" src={images.slider2} alt="" />
            <img height={400} className="w-100" src={images.slider3} alt="" />
          </Slider>
        </div>
        <div className="col-md-3">
          <Slider {...settingsSide}>
            <img height={200} className="w-100" src={images.Banner3} alt="" />
            <img height={200} className="w-100" src={images.Banner2} alt="" />
          </Slider>
          <Slider {...settingsSide}>
            <img height={200} className="w-100" src={images.Banner1} alt="" />
            <img height={200} className="w-100" src={images.Banner2} alt="" />
          </Slider>
        </div>
      </div>
      {/* <div className="row ">
          <div className="col-md-9">
          </div>
          <div className="col-md-3">
            <img height={200} className="w-100" src={images.Banner2} alt="" />
            <img height={200} className="w-100" src={images.Banner3} alt="" />
          </div>
        </div>
        <div className="row ">
          <div className="col-md-9">
          </div>
          <div className="col-md-3">
            <img height={200} className="w-100" src={images.Banner3} alt="" />
            <img height={200} className="w-100" src={images.Banner1} alt="" />
          </div>
        </div> */}
    </>
  );
}
