import React, { useState, useEffect, Fragment } from "react";
import { Switch } from "@headlessui/react";
import Router from "next/router";
import nextCookie from "next-cookies";
import { withAuthSync } from "../lib/auth";
import axios from "axios";
import Image from "next/image";
import Autocomplete from "react-google-autocomplete";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = (props) => {
  const [billing, setBilling] = useState(props.billing_address);
  const [shipping, setShipping] = useState(props.shipping_address);
  const [billingShippingSame, setBillingShippingSame] = useState(false);
  const [userEmail, setUserEmail] = useState(props.email);
  const [firstName, setFirstName] = useState(props.first_name);
  const [lastName, setLastName] = useState(props.last_name);
  const [errorMsg, setErrorMsg] = useState("");
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const environment =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await axios.post(`${environment}/api/account/`, {
        token: props.token,
        first_name: firstName,
        last_name: lastName,
        email: userEmail,
        same_as: billingShippingSame,
        shipping_address: shipping.formatted_address,
        billing_address: billing.formatted_address,
        status: true,
      });

      if (res.status === 201) {
      } else {
        throw new Error(await res.data);
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
    <main className="pt-16 pb-14 sm:pt-24 sm:pb-20 sm:px-6 lg:px-8">
      <div className="wide-load">
        <div className="flex flex-col">
          <div className="px-4 sm:px-0">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Contact Information
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Update your contact information.
            </p>
          </div>
          <div className="pt-8">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <form
              className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              onSubmit={handleSubmit}
            >
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    defaultValue={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md border-2 py-2 px-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    defaultValue={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md border-2 py-2 px-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md border-2 py-2 px-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping address
                </label>
                <div className="mt-1">
                  <Autocomplete
                    className="shadow-sm focus:ring-i-500 focus:border-i-500 block w-full sm:text-sm border-gray-300 rounded-md border-2 py-2 px-4"
                    apiKey={`AIzaSyApuPpbYSAqBTHTnfB_n7SECRD9V9UYpJA`}
                    defaultValue={shipping}
                    options={{
                      types: ["address"],
                      componentRestrictions: { country: ["us", "ca"] },
                    }}
                    onPlaceSelected={(place) => {
                      setShipping(place);
                    }}
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <div className="w-1/2">
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between"
                  >
                    <span className="flex-grow flex flex-col">
                      <Switch.Label
                        as="span"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Billing address same as shipping?
                      </Switch.Label>
                      <Switch.Description
                        as="span"
                        className="text-sm text-gray-500"
                      >
                        If your Billing and Shipping address is the same, please
                        select.
                      </Switch.Description>
                    </span>
                    <Switch
                      checked={billingShippingSame}
                      onChange={setBillingShippingSame}
                      className={classNames(
                        billingShippingSame ? "bg-green-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          billingShippingSame
                            ? "translate-x-5"
                            : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </div>
              </div>
              {!billingShippingSame && (
                <div className="sm:col-span-6">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Billing address
                  </label>
                  <div className="mt-1">
                    <Autocomplete
                      className="shadow-sm focus:ring-i-500 focus:border-i-500 block w-full sm:text-sm border-gray-300 rounded-md border-2 py-2 px-4"
                      apiKey={`AIzaSyApuPpbYSAqBTHTnfB_n7SECRD9V9UYpJA`}
                      defaultValue={billing}
                      options={{
                        types: ["address"],
                        componentRestrictions: { country: ["us", "ca"] },
                      }}
                      onPlaceSelected={(place) => {
                        setBilling(place);
                      }}
                    />
                  </div>
                </div>
              )}
              <div className="w-full sm:col-span-6">
                <button type="submit" className="button w-32">
                  Update
                </button>
              </div>
            </form>
          </div>
          <section aria-labelledby="recent-heading" className="mt-16">
            <h2 id="recent-heading" className="sr-only">
              Contact Information
            </h2>
          </section>
        </div>
        {props.orders && props.orders.length !== 0 && (
          <Fragment>
            <div className="px-4 sm:px-0">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Order history
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of recent orders, manage returns, and download
                invoices.
              </p>
            </div>

            <section aria-labelledby="recent-heading" className="mt-16">
              <h2 id="recent-heading" className="sr-only">
                Recent orders
              </h2>

              <div className="space-y-16 sm:space-y-24">
                {props.orders &&
                  props.orders.map((order) => (
                    <div key={order.number}>
                      <h3 className="sr-only">
                        Order placed on{" "}
                        <time dateTime={order.datetime}>{order.date}</time>
                      </h3>

                      <div className="bg-gray-50 px-4 py-6 sm:rounded-lg sm:p-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
                        <dl className="divide-y divide-gray-200 space-y-4 text-sm text-gray-600 flex-auto md:divide-y-0 md:space-y-0 md:grid grid-cols-6 md:gap-x-6 lg:w-full lg:flex-none lg:gap-x-8">
                          <div className="flex justify-between md:block">
                            <dt className="font-medium text-gray-900">
                              Order number
                            </dt>
                            <dd className="md:mt-1">{order.sale_number}</dd>
                          </div>
                          <div className="flex justify-between pt-4 md:block md:pt-0">
                            <dt className="font-medium text-gray-900">
                              Date placed
                            </dt>
                            <dd className="md:mt-1">
                              <time dateTime={order.datetime}>
                                {order.sale_date}
                              </time>
                            </dd>
                          </div>
                          <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                            <dt>Total amount</dt>
                            <dd className="md:mt-1">${order.total}</dd>
                          </div>
                          <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                            <dt>Order Status</dt>
                            <dd className="md:mt-1">${order.total}</dd>
                          </div>
                          <div className="flex justify-between pt-4 font-medium text-gray-900 md:block md:pt-0">
                            <dt>Tracking Number</dt>
                            <dd className="md:mt-1">
                              {order.tracking_number
                                ? order.tracking_number
                                : "This will be entered once shipped"}
                            </dd>
                          </div>
                        </dl>
                        <div className="space-y-4 mt-6 sm:flex sm:space-x-4 sm:space-y-0 md:mt-0"></div>
                      </div>

                      <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
                        <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
                          {order.items.map((product) => (
                            <div
                              key={product.id}
                              className="flex py-6 sm:py-10"
                            >
                              <div className="min-w-0 flex-1 lg:flex lg:flex-col">
                                <div className="lg:flex-1">
                                  <div className="sm:flex">
                                    <div>
                                      <h4 className="font-medium text-gray-900">
                                        {product.name}
                                      </h4>

                                      <p className="mt-1 font-medium text-gray-900">
                                        <em>Price</em>: ${product.price}
                                      </p>
                                      <p className="mt-1 font-medium text-gray-900">
                                        <em>Quantity</em>: {product.amount}
                                      </p>
                                      <p className="mt-2 text-sm text-gray-500">
                                        {product.option}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                    <a
                                      href={product.href}
                                      className="text-i-600 hover:text-i-500"
                                    >
                                      View Product
                                    </a>
                                  </div>
                                  <div className="mt-2 flex text-sm font-medium sm:mt-4">
                                    <a
                                      href={product.href}
                                      className="text-i-600 hover:text-i-500"
                                    >
                                      View Instructions
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0 sm:m-0 sm:mr-6 sm:order-first">
                                <Image
                                  src={product.image}
                                  alt={`Product image for ${product.name}`}
                                  className="col-start-2 col-end-3 sm:col-start-1 sm:row-start-1 sm:row-span-2 w-20 h-20 rounded-lg object-center object-cover sm:w-40 sm:h-40 lg:w-52 lg:h-52"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </Fragment>
        )}
      </div>
    </main>
  );
};

Profile.getInitialProps = async (ctx) => {
  const { token } = nextCookie(ctx);
  var environment = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
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

export default withAuthSync(Profile);
