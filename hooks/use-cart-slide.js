import { useState, createContext, useContext, useEffect } from "react";

export const CartContext = createContext();
export function useCartState() {
  const [cartSlide, updateCartSlide] = useState(false);

  return {
    cartSlide,
    updateCartSlide,
  };
}

export function useCartSlide() {
  const cart = useContext(CartContext);
  return cart;
}
