/* eslint-disable */
import React from "react";
import { useState, useEffect, Fragment } from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Drawer from "./widget/drawer";
import Image from "next/image";
import Link from "next/link";
export default function Store({ results, selected, category }) {
  const [localResults, setLocalResults] = useState(
    selected ? selected : results
  );
  const [filterable, setFilterable] = useState("");
  const [loading, setLoading] = useState(false);

  const filterSelected = (value) => {
    // Save the filters
    setFilterable(value);
    // Now Filter the data
    let filteredResults = [];
    setLoading(true);
    if (filterable) {
      results.filter(function (_result) {
        if (_result.name === value) {
          filteredResults.push(_result);
        }
      });
    } else {
      filteredResults = results;
    }
    setTimeout(
      function () {
        //Start the timer
        setLoading(false); //After 1.5 second, set loading to false
      }.bind(this),
      1500
    );
    setLocalResults(filteredResults);
  };
  return (
    <main className="">
      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">Filters</h2>

          <div className="sticky top-16">
            <h3 className="text-xl uppercase text-blue-green font-normal pb-4">
              Browse Categories
            </h3>
            <form className="space-y-6 max-h-96 overflow-scroll p-2">
              {category &&
                category.map((option, optionIdx) => (
                  <Link
                    href={{
                      pathname: "/products",
                      query: { category: option.name },
                    }}
                    key={option.id}
                    passHref
                  >
                    <a className="flex items-center cursor-pointer no-underline">
                      <label
                        htmlFor={`${optionIdx}`}
                        className="text-sm text-gray-600 flex flex-row w-full"
                      >
                        <div className="flex-1">{option.name}</div>
                        <div className="flex justify-end">
                          <PlusSmIcon
                            className="ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </div>
                      </label>
                    </a>
                  </Link>
                ))}
            </form>
          </div>
        </aside>
        <section
          aria-labelledby="product-heading"
          className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>
          {!loading ? (
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {localResults.map((result, idx) => (
                <Fragment key={idx}>
                  {result.products.map((product, idx) => (
                    <Drawer
                      product={product}
                      category={result}
                      key={idx}
                      three={(idx + 1) % 3}
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
