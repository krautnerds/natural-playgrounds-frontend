import { useState, createContext, useContext, useEffect } from "react";

export const CartContext = createContext();
export function useCartState() {
  const [cartSlide, updateCartSlide] = useState(false);
  const [testimonial, updateTestimonial] = useState("");

  return {
    cartSlide,
    updateCartSlide,
    testimonial,
    updateTestimonial,
  };
}

export function useCartSlide() {
  const cart = useContext(CartContext);
  return cart;
}
