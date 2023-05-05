import React from "react";
import styles from "./Layout.module.css";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout({ userData }) {
  return (
    <>
      <NavBar userData={userData} />
      <div className="container min-vh-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
