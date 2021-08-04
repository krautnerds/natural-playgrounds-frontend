import { useState, createContext, useContext, useEffect } from "react";
const defaultCart = {
  products: {},
};
export const CartContext = createContext();
export function useCartState() {
  const [cart, updateCart] = useState(defaultCart);
  const cartItems = Object.keys(cart.products).map((key) => {
    return { ...cart.products[key] };
  });
  const totalItems = cartItems.reduce(
    (accumulator, { quantity }) => accumulator + quantity,
    0
  );
  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("natural_cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      updateCart(data);
    }
  }, []);
  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("natural_cart", data);
  }, [cart]);
  function addToCart({ id, quantity } = {}) {
    updateCart((prevState) => {
      let cartState = { ...prevState };
      if (cartState.products[id]) {
        cartState.products[id].quantity =
          cartState.products[id].quantity + quantity;
      } else {
        cartState.products[id] = {
          id,
          quantity,
        };
      }
      return cartState;
    });
  }
  return { cart, updateCart, addToCart, totalItems };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
