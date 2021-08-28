import "../styles/globals.css";
import { CartContext, useCartState } from "../hooks/use-cart-slide.js";
import Layout from "../components/layout";
import { CartProvider } from "react-use-cart";
import { ToastProvider } from "react-toast-notifications";
function MyApp({ Component, pageProps }) {
  const cart = useCartState();
  return (
    <ToastProvider>
      <CartProvider>
        <CartContext.Provider value={cart}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContext.Provider>
      </CartProvider>
    </ToastProvider>
  );
}

export default MyApp;
