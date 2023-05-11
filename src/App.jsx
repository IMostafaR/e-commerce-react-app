import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import AllOrders from "./components/AllOrders/AllOrders";
import NotFound from "./components/NotFound/NotFound";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CartContextProvider from "./context/CartContext";
import ProductContextProvider from "./context/ProductContext";
import { Toaster } from "react-hot-toast";
import { Offline } from "react-detect-offline";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  let routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          path: "/e-commerce-react-app",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "product/:id",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders userData={userData} />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile userData={userData} setUserData={setUserData} />
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login saveUserData={saveUserData} /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return (
    <>
      <CartContextProvider>
        <ProductContextProvider>
          {/* <Offline>
            <span className="network rounded-4 text-warning fw-bolder p-3 bg-black font-sm">
              <i className="fa-solid fa-wifi fa-beat-fade me-2"></i> You're
              offline, check your network!
            </span>
          </Offline> */}
          <Toaster />
          <RouterProvider router={routers}></RouterProvider>
        </ProductContextProvider>
      </CartContextProvider>
    </>
  );
}

export default App;
