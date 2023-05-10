import React, { useState } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";

export default function AllOrders() {
  const [loader, setLoader] = useState(false);

  async function getAllOrders() {
    setLoader(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/orders/`
    );
    console.log(data);
    setLoader(false);
  }
  return (
    <>
      <div className="container my-5 bg-main-light p-4 shadow rounded-3">
        AllOrders
      </div>
    </>
  );
}
