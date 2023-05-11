import axios from "axios";
import { createContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { Router } from "react-router-dom";
import Login from "../components/Login/Login";

export let userContext = createContext();

export default function UserContextProvider(props) {
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    let response = await login();
    if (response?.data?.message === "success") {
      saveUserData();
      console.log(userData);
    }
  }

  useEffect(() => {}, [userData]);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
    getUserData();
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }

  async function login(values) {
    return axios
      .post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values)
      .then((response) => response)
      .catch((error) => error);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
  }
  return (
    <userContext.Provider value={{ userData, logOut, saveUserData, login }}>
      {props.children}
    </userContext.Provider>
  );
}

// {
//     "id": "64545a1339c14a00339eb72f",
//     "name": "mostafa",
//     "role": "user",
//     "iat": 1683696861,
//     "exp": 1691472861
// }
