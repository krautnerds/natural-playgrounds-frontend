import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useCartSlide } from "../hooks/use-cart-slide.js";
import { useCart } from "react-use-cart";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/outline";
export default function Cart() {
  const { cartSlide, updateCartSlide } = useCartSlide();
  const { cartTotal, items, removeItem, updateItemQuantity } = useCart();
  return (
    <Transition.Root show={cartSlide} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={updateCartSlide}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => updateCartSlide(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {items && items.length > 0 ? (
                            items.map((product) => (
                              <li key={product.id} className="py-6 flex">
                                <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden relative">
                                  {product.image && (
                                    <Image
                                      src={product.image}
                                      alt={`Product Image of ${product.name}`}
                                      fill
                                      className="w-full h-full object-center object-cover"
                                    />
                                  )}
                                </div>

                                <div className="ml-4 flex-1 flex flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <div>
                                        <h3 className="text-lg">
                                          <Link
                                            href={`/products/${product.slug}`}
                                            className="no-underline"
                                          >
                                            {product.name}
                                          </Link>
                                        </h3>
                                      </div>

                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                    <p className="text-md italic">
                                      {product.option}
                                    </p>
                                  </div>

                                  <div className="flex-1 flex items-end justify-between text-sm">
                                    <div className="w-16">
                                      <label
                                        htmlFor={`quantity-${product.id}`}
                                        className="sr-only"
                                      >
                                        Quantity, {product.name}
                                      </label>
                                      <select
                                        id={`quantity-${product.id}`}
                                        name={`quantity-${product.id}`}
                                        value={product.quantity}
                                        onChange={(e) => {
                                          updateItemQuantity(
                                            product.id,
                                            e.target.value
                                          );
                                        }}
                                        className="w-full max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                      >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                      </select>
                                    </div>
                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-green-600 hover:text-green-500"
                                        onClick={() => removeItem(product.id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <Link 
                              href="/products/" 
                              className="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 no-underline"
                            >
                              <ShoppingCartIcon
                                className="mx-auto h-12 w-12 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="mt-2 block text-sm font-medium text-gray-900">
                                Your cart is empty!
                              </span>
                              <span className="mt-2 block text-sm font-medium text-gray-900 underline">
                                View our products
                              </span>
                            </Link>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping is estimated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link 
                        href="/checkout/" 
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 no-underline"
                        onClick={() => updateCartSlide(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="text-green-600 font-medium hover:text-green-500"
                          onClick={() => updateCartSlide(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
