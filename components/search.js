import { useState, useEffect } from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Image from "next/image";

export default function Search({ results, category }) {
  const [search, setSearch] = useState("");
  const [localResults, setLocalResults] = useState(results);
  const [filterable, setFilterable] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterSelected = (value) => {
    // Save the filters
    var local_filters = [...filterable];
    var index = local_filters.indexOf(value);
    if (index === -1) {
      local_filters.push(value);
    } else {
      local_filters.splice(index, 1);
    }
    setFilterable(local_filters);
    // Now Filter the data
    let filteredResults = [];
    setLoading(true);
    if (filterable.length !== 0) {
      filterable.filter(function (_filter) {
        results.filter(function (_result) {
          _result.category.filter(function (_category) {
            if (_category.name.includes(_filter)) {
              filteredResults.push(_result);
            }
          });
        });
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
    <main className="max-w-2xl mx-auto px-4 lg:max-w-7xl lg:px-8">
      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">Filters</h2>

          <div className="sticky top-16">
            <h3 className="text-2xl font-medium leading-6 text-gray-900 pb-4">
              Select a Category
            </h3>
            <form className="space-y-6 max-h-96 overflow-scroll border-gray-200 border-2 p-2 rounded-lg drop-shadow-lg">
              {category.map((option, optionIdx) => (
                <div key={option.id} className="flex items-center">
                  <input
                    id={`${optionIdx}`}
                    name={`${option.name}`}
                    type="checkbox"
                    onChange={(event) => filterSelected(option.name)}
                    className="focus:ring-dark-green h-4 w-4 text-dark-green border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`${optionIdx}`}
                    className="ml-3 text-sm text-gray-600 flex flex-row w-full"
                  >
                    <div className="flex-1">{option.name}</div>
                    <div className="flex justify-end">
                      <PlusSmIcon
                        className="ml-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </label>
                </div>
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
              {localResults.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
                >
                  <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-64">
                    {product.image_url ? (
                      <Image
                        src={product.image_url}
                        alt={`Product Image for ${product.name}`}
                        className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                      />
                    ) : (
                      <div className="w-full h-full object-center object-cover sm:w-full sm:h-full"></div>
                    )}
                  </div>
                  <div className="flex-1 p-4 space-y-2 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={product.link}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    {product.search_description && (
                      <div
                        className="prose text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: product.search_description,
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-screen flex justify-center align-center items-center">
              <Loader type="Puff" color="#0d5352" height={100} width={100} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
