import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/solid";
import { useCart } from "react-use-cart";
import axios from "axios";
import nextCookie from "next-cookies";
import { withAuthSync } from "../lib/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Router from "next/router";
const Checkout = (props) => {
  const { cartTotal, items, removeItem, updateItemQuantity, emptyCart } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [total, updateTotal] = useState(0);
  const [shippingAmount, updateShippingAmount] = useState(232);
  const [company, setCompany] = useState(props.company);
  const [billing, setBilling] = useState(props.billing_address);
  const [shipping, setShipping] = useState(props.shipping_address);
  const [billingShippingSame, setBillingShippingSame] = useState(false);
  const [userEmail, setUserEmail] = useState(props.email);
  const [firstName, setFirstName] = useState(props.first_name);
  const [fax, setFax] = useState(props.fax);
  const [phone, setPhone] = useState(props.phone);
  const [lastName, setLastName] = useState(props.last_name);

  const [cc, setCC] = useState("");
  const [cvc, setCVC] = useState("");
  const [expiry_month, setExpiryMonth] = useState("");
  const [expiry_year, setExpiryYear] = useState("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const environment = process.env.API_URL || "http://localhost:8000";
      const res = await axios.post(`${environment}/api/checkout/`, {
        token: props.token,
        firstName: firstName,
        lastName: lastName,
        email: userEmail,
        billing: billing,
        shipping: shipping,
        customer_shipping: shippingAmount,
        same_as: billingShippingSame,
        company: company,
        fax: fax,
        phone: phone,
        cc: cc,
        cvc: cvc,
        expiry_month: expiry_month,
        expiry_year: expiry_year,
        items: items,
      });

      if (res.status === 201) {
        const data = await res.data;
        emptyCart();
        Router.push(`/purchase/${data.saleId}`);
      } else {
        throw new Error(await res.data);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        setErrorMsg(error.response.data.non_field_errors[0]);
      }
    }
  }
  return (
    <div className="">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        {!isSubmitting ? (
          <form
            className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="">
                <h2 className="text-lg font-medium text-gray-900">
                  Contact information
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        autoComplete="given-name"
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        autoComplete="family-name"
                        defaultValue={lastName}
                        onChange={(e) => setLasstName(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Company
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        defaultValue={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-1">
                    <label
                      htmlFor="fax"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fax Number
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="fax"
                        id="fax"
                        autoComplete="tel"
                        defaultValue={fax}
                        onChange={(e) => setFax(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-1">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        defaultValue={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-10 border-t border-gray-200 pt-10">
                <h2 className="text-lg font-medium text-gray-900">Payment</h2>

                <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4">
                  <div className="col-span-3">
                    <label
                      htmlFor="card-number"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Card number
                    </label>
                    <div className="mt-1 w-full cc">
                      <input
                        id="card-number"
                        name="card-number"
                        autoComplete="cc-number"
                        defaultValue={cc}
                        maxLength="16"
                        onChange={(e) => setCC(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div className="col-span-3">
                    <label
                      htmlFor="name-on-card"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name on card
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name-on-card"
                        name="name-on-card"
                        autoComplete="cc-name"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-1">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration Month (MM)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        defaultValue={expiry_month}
                        maxLength="2"
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>
                  <div className="col-span-3 md:col-span-1">
                    <label
                      htmlFor="expiration-date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Expiration Year (YY)
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="expiration-date"
                        id="expiration-date"
                        autoComplete="cc-exp"
                        maxLength="2"
                        defaultValue={expiry_year}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 md:col-span-1">
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="cvc"
                        id="cvc"
                        autoComplete="csc"
                        defaultValue={cvc}
                        maxLength="4"
                        onChange={(e) => setCVC(e.target.value)}
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm p-2 border-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="mt-10 lg:mt-0">
              <h2 className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h3 className="sr-only">Items in your cart</h3>
                <ul role="list" className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6 px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={`Product Image of ${item.name}`}
                            className="w-32 h-32 object-center object-cover"
                          />
                        )}
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <a
                                href={`/products/${item.slug}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {items.option}
                            </p>
                          </div>

                          <div className="ml-4 flex-shrink-0 flow-root">
                            <button
                              type="button"
                              className="-m-2.5 bg-white p-2 border-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <span className="sr-only">Remove</span>
                              <TrashIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="pt-2 flex items-end justify-between">
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${item.price}
                          </p>

                          <div className="ml-4 w-16">
                            <label htmlFor="quantity" className="sr-only">
                              Quantity
                            </label>
                            <select
                              id={`quantity-${item.id}`}
                              name={`quantity-${item.id}`}
                              value={item.quantity}
                              onChange={(e) => {
                                updateItemQuantity(item.id, e.target.value);
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
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${cartTotal}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">
                      Shipping
                      <br />
                      <div class="w-3/4 text-xs italic">
                        This is our best guest. Due to the nature of our
                        products we put an estimate together. Once the product
                        is ready to ship, we'll reach back out with actual
                        shipping amounts. Your card will be charge then.
                      </div>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${shippingAmount}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${cartTotal + shippingAmount}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  {cc && items.length > 0 ? (
                    <button type="submit" className="w-full button">
                      Confirm order
                    </button>
                  ) : (
                    <button type="button" className="w-full button-empty">
                      Please check credit card and/or add items to cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="h-screen flex justify-center align-center items-center">
            <Loader type="Puff" color="#0d5352" height={100} width={100} />
          </div>
        )}
      </div>
    </div>
  );
};
Checkout.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  var environment = process.env.API_URL || "http://localhost:8000";
  const apiUrl = `${environment}/api/account/`;

  const redirectOnError = () =>
    typeof window !== "undefined"
      ? Router.push("/login")
      : ctx.res.writeHead(302, { Location: "/login" }).end();

  try {
    const response = await axios.post(apiUrl, {
      token: token,
    });

    if (response.status == 201) {
      const data = await response.data;
      return data;
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError();
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError();
  }
};

export default withAuthSync(Checkout);
