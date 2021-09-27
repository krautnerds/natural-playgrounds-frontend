import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import { useCart } from "react-use-cart";
import { Switch } from "@headlessui/react";
import axios from "axios";
import nextCookie from "next-cookies";
import { withAuthSync } from "../lib/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Router from "next/router";
import Image from "next/image";
import Link from "next/link";
import Autocomplete from "react-google-autocomplete";
import { useToasts } from "react-toast-notifications";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Checkout = (props) => {
  const { addToast } = useToasts();
  const { cartTotal, items, removeItem, updateItemQuantity, emptyCart } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [total, updateTotal] = useState(0);
  const [shippingAmount, updateShippingAmount] = useState(() =>
    getShippingAmount()
  );
  const [company, setCompany] = useState(props.company);
  const [billing, setBilling] = useState(props.raw_billing);
  const [shipping, setShipping] = useState(props.raw_shipping);
  const [billingShippingSame, setBillingShippingSame] = useState(props.same_as);
  const [userEmail, setUserEmail] = useState(props.email);
  const [firstName, setFirstName] = useState(props.first_name);
  const [fax, setFax] = useState(props.fax_number);
  const [phone, setPhone] = useState(props.phone_number);
  const [lastName, setLastName] = useState(props.last_name);
  const [billingDirty, setBillingDirty] = useState(false);
  const [shippingDirty, setShippingDirty] = useState(false);

  const [cc, setCC] = useState("");
  const [cvc, setCVC] = useState("");
  const [expiry_month, setExpiryMonth] = useState("");
  const [expiry_year, setExpiryYear] = useState("");
  useEffect(() => {
    setBilling("");
  }, [billingShippingSame]);
  function getShippingAmount() {
    var shipping_amount = 0;
    items.map((item) => {
      shipping_amount =
        shipping_amount + parseFloat(item.quantity * item.weight);
    });
    if (shipping_amount >= 300 && cartTotal < 1500) {
      return 600;
    }
    if (shipping_amount > 300) {
      return cartTotal * 1.33;
    }
    if (shipping_amount >= 100) {
      return cartTotal * 1.3;
    }
    if (shipping_amount >= 40) {
      return cartTotal * 1.1;
    }

    return shipping_amount;
  }
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const environment =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
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
      }
    } catch (error) {
      setIsSubmitting(false);
      addToast(
        "Issue processing your credit card. Please check the numbers or contact us at info@naturalplaygrounds.com",
        { appearance: "error" }
      );
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
              <div className="mt-10 pt-10">
                <h2 className="text-lg font-medium text-gray-900">
                  Shipping/Billing Information
                </h2>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
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
                        required={true}
                        onChange={(e) => {
                          setShippingDirty(true);
                        }}
                        onPlaceSelected={(place) => {
                          setShipping(place);
                          setShippingDirty(false);
                        }}
                      />
                      {shippingDirty && (
                        <p className="text-red-500 text-xs italic">
                          Please select a valid address
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="sm:col-span-6">
                    <div className="w-full">
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
                            If your Billing and Shipping address is the same,
                            please select.
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={billingShippingSame}
                          onChange={setBillingShippingSame}
                          className={classNames(
                            billingShippingSame
                              ? "bg-green-600"
                              : "bg-gray-200",
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
                          required={!billingShippingSame}
                          options={{
                            types: ["address"],
                            componentRestrictions: { country: ["us", "ca"] },
                          }}
                          onChange={(e) => {
                            setBillingDirty(true);
                          }}
                          onPlaceSelected={(place) => {
                            setBilling(place);
                            setBillingDirty(false);
                          }}
                        />
                        {billingDirty && (
                          <p className="text-red-500 text-xs italic">
                            Please select a valid address
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-10 pt-10">
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        required={true}
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
                        autoComplete="cc-csc"
                        defaultValue={cvc}
                        required={true}
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
                      <div className="flex-shrink-0 h-32 w-32 relative">
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={`Product Image of ${item.name}`}
                            className="object-center object-cover"
                            layout="fill"
                          />
                        )}
                      </div>

                      <div className="ml-6 flex-1 flex flex-col">
                        <div className="flex">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm">
                              <Link
                                href={`/products/${item.slug}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {item.name}
                              </Link>
                            </h4>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.option}
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
                      ${cartTotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm">
                      Shipping
                      <br />
                      <div className="w-3/4 text-xs italic">
                        This is our best guess. Due to the nature of our
                        products we put an estimate together. Once the product
                        is ready to ship, we&lsquo;ll reach back out with actual
                        shipping amounts. Your card will be charge then.
                      </div>
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ${shippingAmount.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                    <dt className="text-base font-medium">Total</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${(cartTotal + shippingAmount).toFixed(2)}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  {items.length <= 0 ? (
                    <p className="text-white bg-red-600 p-4 border-left-4 border-red-800">
                      Cart can't be empty
                    </p>
                  ) : (
                    <>
                      {cc &&
                      items.length > 0 &&
                      !shippingDirty &&
                      !billingDirty ? (
                        <button type="submit" className="w-full button">
                          Confirm order
                        </button>
                      ) : (
                        <button type="button" className="w-full button-empty">
                          Please check credit card and/or add items to cart
                        </button>
                      )}
                    </>
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

export default withAuthSync(Checkout);
