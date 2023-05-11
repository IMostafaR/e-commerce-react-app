import React, { useState, useContext, useEffect } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { userContext } from "../../context/UserContext";
import { cartContext } from "../../context/CartContext";

export default function AllOrders() {
  //   const [loader, setLoader] = useState(false);
  //   const [allOrdersDetails, setAllOrdersDetails] = useState(null);

  //   let { userData } = useContext(userContext);
  //   let { getAllUserOrders } = useContext(cartContext);

  //   async function getAllOrders() {
  //     setLoader(true);
  //     // let response = await getAllUserOrders();
  //     // console.log(response);
  //     // if (response?.data?.status === "success") {
  //     //   setAllOrdersDetails(response.data.data);
  //     // }
  //     // console.log(userData);
  //     // setLoader(false);
  //   }

  //   useEffect(() => {
  //     getAllOrders();
  //     console.log(userData);

  //     window.scrollTo(0, 0);
  //   }, []);

  return (
    <>
      <div className="container my-5 bg-main-light p-4 shadow rounded-3">
        AllOrders
      </div>
    </>
  );
}
