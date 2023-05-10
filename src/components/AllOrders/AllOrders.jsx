import React, { useState, useContext } from "react";
import styles from "./AllOrders.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { userContext } from "../../context/UserContext";

export default function AllOrders() {
  const [loader, setLoader] = useState(false);
  let { userData } = useContext(userContext);

  return (
    <>
      <div className="container my-5 bg-main-light p-4 shadow rounded-3">
        AllOrders
      </div>
    </>
  );
}
