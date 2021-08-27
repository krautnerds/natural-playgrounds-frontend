import Head from "next/head";
import { useState, useEffect } from "react";
import { Disclosure, Tab } from "@headlessui/react";
import { HeartIcon, MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

import { CartProvider, useCart } from "react-use-cart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Product({ product }) {
  const { addItem, inCart } = useCart();
  const [option, setOption] = useState("");
  const [optionName, setOptionName] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    for (var i in product.options) {
      if (product.options[i].id === option) {
        setPrice(product.options[i].current_price);
        break; // If you want to break out of the loop once you've found a match
      }
    }
  }, [option]);
  return (
    <main className="max-w-6xl mx-auto sm:pt-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto lg:max-w-none">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {product.images &&
                  product.images.map((image) => (
                    <Tab
                      key={image.id}
                      className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                    >
                      {({ selected }) => (
                        <>
                          <span className="sr-only">{image.name}</span>
                          <span className="absolute inset-0 rounded-md overflow-hidden">
                            <Image
                              src={image.image_url}
                              alt={`Product image of ${image.name}`}
                              className="w-full h-full object-center object-cover"
                              layout="fill"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-green-500" : "ring-transparent",
                              "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
              </Tab.List>
            </div>

            <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
              {product.images &&
                product.images.map((image) => (
                  <Tab.Panel key={image.id}>
                    <Image
                      src={image.image_url}
                      alt={`Product image of ${image.name}`}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                      layout="fill"
                    />
                  </Tab.Panel>
                ))}
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
            </div>

            <div className="mt-6 border-t border-gray-50">
              <h3 className="sr-only">Description</h3>

              <div
                className="text-base text-gray-700 space-y-6"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="border-t border-gray-200 pt-6 mt-8">
              {/* Colors */}
              <div>
                <h3 className="text-lg text-gray-600">Select Option</h3>
                <div>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-2 border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                    value={option}
                    onChange={(e) => {
                      setOption(e.target.value);
                      console.log(
                        e.target.options[e.target.selectedIndex].text
                      );
                      setOptionName(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="" disabled selected>
                      Select an Option
                    </option>
                    {product.options &&
                      product.options.map((option) => (
                        <option value={option.id} key={option.id}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              <div className="mt-10 flex sm:flex-col1">
                <button
                  type="button"
                  className="max-w-xs flex-1 bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500 sm:w-full"
                  onClick={() => {
                    addItem({
                      id: option,
                      quantity: 1,
                      price: price,
                      slug: product.slug,
                      option: optionName,
                      name: product.name,
                      image: product.image_url,
                    });
                  }}
                >
                  Add to Cart
                </button>

                <button
                  type="button"
                  className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                >
                  <HeartIcon
                    className="h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Add to favorites</span>
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="border-t divide-y divide-gray-200">
                {product.details &&
                  product.details.map((detail) => (
                    <Disclosure as="div" key={detail.name}>
                      {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative w-full py-6 flex justify-between items-center text-left">
                              <span
                                className={classNames(
                                  open ? "text-green-600" : "text-gray-900",
                                  "text-sm font-medium"
                                )}
                              >
                                {detail.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="block h-6 w-6 text-green-400 group-hover:text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel
                            as="div"
                            className="pb-6 prose prose-sm"
                          >
                            <div
                              className="prose"
                              dangerouslySetInnerHTML={{
                                __html: detail.description,
                              }}
                            ></div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
              </div>
            </section>
          </div>
        </div>
        {product.og_bundles && (
          <section
            aria-labelledby="related-heading"
            className="mt-10 border-t border-gray-200 py-16 px-4 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              This product is best when purchased with:
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {product.og_bundles &&
                product.og_bundles.map((product) => (
                  <div key={product.id}>
                    <div className="relative">
                      <div className="relative w-full h-72 rounded-lg overflow-hidden">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt={`Related Product`}
                            className="w-full h-full object-center object-cover"
                            layout="fill"
                          />
                        )}
                      </div>
                      <div className="relative mt-4">
                        <h3 className="text-lg font-bold text-gray-900">
                          {product.name}
                        </h3>
                      </div>
                      <div className="absolute top-0 inset-x-0 h-72 rounded-lg p-4 flex items-end justify-end overflow-hidden">
                        <div
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col justify-center align-center mx-auto">
                      <Link href={product.href} passHref>
                        <a className="button text-center no-underline">
                          View Product
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
        {product.og && (
          <section
            aria-labelledby="related-heading"
            className="mt-5 border-t border-gray-200 py-16 px-4 sm:px-0"
          >
            <h2
              id="related-heading"
              className="text-xl font-bold text-gray-900"
            >
              Similar Products
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {product.og &&
                product.og.map((related) => (
                  <div key={related.id}>
                    <div className="relative">
                      <div className="relative w-full h-72 rounded-lg overflow-hidden">
                        {related.image_url && (
                          <Image
                            src={related.image_url}
                            alt={`Related Product`}
                            className="w-full h-full object-center object-cover"
                            layout="fill"
                          />
                        )}
                      </div>
                      <div className="relative mt-4">
                        <h3 className="text-lg font-bold text-gray-900">
                          {related.name}
                        </h3>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col justify-center align-center mx-auto">
                      <Link href={related.href} passHref>
                        <a className="button text-center no-underline">
                          View Product
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.API_URL}/api/products/${params.slug}/?format=json`
  );

  return {
    props: {
      product: await res.json(),
    },
  };
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.API_URL}/api/products/?format=json`);
  const products = await res.json();
  const paths = products.map((product) => {
    return {
      params: {
        slug: product.slug.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
