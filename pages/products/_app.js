// /pages/_app_.js
import React from "react";
import App from "next/app";
import Layout from "./components/layout";

class Products extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component {...pageProps}></Component>
      </Layout>
    );
  }
}

export default Products;
