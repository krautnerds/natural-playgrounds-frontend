// components/layout.js

import Navbar from "./navbar";
import Footer from "./footer";
import Connected from "./connected";
import Cart from "./cart";
import Contact from "./contact";

export default function Layout({ children }) {
  return (
    <>
      <Contact />
      <Navbar />
      <main>{children}</main>
      <Cart />
      <Connected />
      <Footer />
    </>
  );
}
