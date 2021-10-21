/* eslint-disable */
import React from "react";
import { useState, useEffect, Fragment } from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Drawer from "./widget/drawer";
import Link from "next/link";
export default function Store({ results, selected, category }) {
  const [localResults, setLocalResults] = useState(
    selected ? selected : results
  );
  const [loading, setLoading] = useState(false);

  return (
    <main className="">
      <div className="pt-12 pb-24 lg:grid grid-cols-1 lg:gap-x-8">
        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:mt-0 col-span-1"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>
          {!loading ? (
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-4">
              {localResults.map((result, idx) => (
                <Fragment key={idx}>
                  {result.products.map((product, productIdx) => (
                    <Drawer
                      product={product}
                      category={result}
                      key={productIdx}
                    />
                  ))}
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="h-64 flex justify-center align-center items-center">
              <Loader type="Puff" color="#0d5352" height={100} width={100} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
