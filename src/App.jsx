import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} />,
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "products", element: <Products /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}

export default App;
