import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PlusSmIcon } from "@heroicons/react/solid";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Link from "next/link";
import Image from "next/image";

export default function Search({ results, category }) {
  const { query } = useRouter();
  const [cnt, setCnt] = useState(1);
  const [localResults, setLocalResults] = useState(results);
  const [filterable, setFilterable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(query);
    if (query.search) {
      filterSearch(query.search);
    }
    if (query.category) {
      filterSelected(query.category);
    }
  }, []);

  const filterSearch = (value) => {
    setLoading(true);
    if (value) {
      let filteredResults = [];
      results.filter(function (_result) {
        if (_result.description && _result.description.includes(value)) {
          filteredResults.push(_result);
        }
      });
      setLocalResults(filteredResults);
    }

    setLoading(false);
  };

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
    if (local_filters.length !== 0) {
      local_filters.filter(function (_filter) {
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
    setLocalResults([...new Set(filteredResults)]);
  };

  return (
    <main className="max-w-2xl mx-auto px-4 lg:max-w-6xl lg:px-8">
      <div className="pt-12 pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <aside>
          <h2 className="sr-only">Filters</h2>

          <div className="sticky top-16">
            <h3 className="text-2xl font-medium leading-6 text-gray-900 pb-4">
              Select a Category
            </h3>
            <form className="space-y-6 max-h-96 overflow-scroll">
              {category.map((option, optionIdx) => (
                <div key={optionIdx} className="flex items-center">
                  <input
                    id={`${optionIdx}`}
                    name={`${option.name}`}
                    type="checkbox"
                    onChange={(event) => filterSelected(option.name)}
                    className="focus:ring-dark-green h-4 w-4 text-dark-green border-gray-300 rounded"
                    checked={filterable.includes(option.name) && true}
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
          className="mt-6 lg:mt-0 lg:col-span-2 xl:col-span-3 max-h-screen overflow-scroll"
        >
          <h2 id="product-heading" className="sr-only">
            Products
          </h2>
          {!loading ? (
            <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {localResults.map((product, productIdx) => (
                <Link key={productIdx} href={product.link} className="group">
                  <a>
                    <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={`Product Image for ${product.name}`}
                          className="w-full h-full object-center object-cover group-hover:opacity-75"
                          layout="fill"
                        />
                      ) : (
                        <div className="w-full h-full object-center object-cover sm:w-full sm:h-full"></div>
                      )}
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {product.name}
                    </h3>
                    {product.search_description && (
                      <div
                        className="mt-1 text-lg font-medium text-gray-900"
                        dangerouslySetInnerHTML={{
                          __html: product.search_description,
                        }}
                      />
                    )}
                  </a>
                </Link>
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
