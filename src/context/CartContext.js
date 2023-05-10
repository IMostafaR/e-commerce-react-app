import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

export default function CartContextProvider(props) {
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [animateCart, setAnimateCart] = useState(false);

  async function haveCart() {
    let response = await getLoggedUserCart();
    if (response?.data?.status === "success") {
      setCartId(response.data.data._id);
      setNumOfCartItems(response.data.numOfCartItems);
    }
  }
  useEffect(() => {
    haveCart();
  }, []);

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function addToCart(productId) {
    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,
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
        `https://route-ecommerce-app.vercel.app/api/v1/cart`,

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
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${productId}`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function updateCartItemCount(productId, count) {
    return axios
      .put(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/${productId}`,
        { count: count },

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function clearCart() {
    return axios
      .delete(
        `https://route-ecommerce-app.vercel.app/api/v1/cart/`,

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(cartId, shippingAddress) {
    return axios
      .post(
        `https://route-ecommerce-app.vercel.app/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress: shippingAddress },

        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  return (
    <cartContext.Provider
      value={{
        cartId,
        numOfCartItems,
        animateCart,
        setAnimateCart,
        setNumOfCartItems,
        addToCart,
        getLoggedUserCart,
        removeCartItem,
        updateCartItemCount,
        clearCart,
        onlinePayment,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
