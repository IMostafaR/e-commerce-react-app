import { createContext, useContext } from "react";
import { toast } from "react-hot-toast";
import { cartContext } from "./CartContext";

export let productContext = createContext();

export default function ProductContextProvider(props) {
  let { addToCart, setNumOfCartItems, setAnimateCart } =
    useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response?.data?.status === "success") {
      setNumOfCartItems(response.data.numOfCartItems);
      setAnimateCart(true);
      setTimeout(() => {
        setAnimateCart(false);
      }, 1000);
      toast.success(response.data.message, {
        duration: 4000,
        position: "bottom-right",
        className:
          "text-center border-2 border-success shadow bg-dark text-white font-sm",
      });
    } else {
      toast.error(
        "There is error during adding to your cart, please try again",
        {
          duration: 4000,
          position: "bottom-right",
          className:
            "text-center border-2 border-success shadow bg-dark text-white font-sm",
        }
      );
    }
  }

  return (
    <productContext.Provider value={{ addProduct }}>
      {props.children}
    </productContext.Provider>
  );
}
