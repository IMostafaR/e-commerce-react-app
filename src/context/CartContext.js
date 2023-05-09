import axios from "axios";
import { createContext } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://route-ecommerce.onrender.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function getLoggedUserCart() {
    return axios
      .get(
        `https://route-ecommerce.onrender.com/api/v1/cart`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(
        `https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{ addToCart, getLoggedUserCart, removeCartItem }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
