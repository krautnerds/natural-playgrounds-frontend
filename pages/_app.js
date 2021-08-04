import "../styles/globals.css";
import { CartContext, useCartState } from "../hooks/use-cart.js";
import Layout from "../components/layout";
function MyApp({ Component, pageProps }) {
  const cart = useCartState();
  return (
    <CartContext.Provider value={cart}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  );
}

export default MyApp;
