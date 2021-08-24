import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import Logo from "../images/logo.png";
import Image from "next/image";
import { useCart } from "../hooks/use-cart";
import {
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  UserIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "About", href: "/about/", current: true },
  { name: "Products", href: "/products/", current: false },
  { name: "Design Services", href: "/design-services/", current: false },
  { name: "Gallery", href: "/gallery/", current: false },
];

const mobileNavigation = [
  { name: "About", href: "/about/", current: true },
  { name: "Products", href: "/products/", current: false },
  { name: "Design Services", href: "/design-services/", current: false },
  { name: "Gallery", href: "/gallery/", current: false },
  { name: "Shopping Cart", href: "/cart/", current: false },
  { name: "My Account", href: "/account/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { totalItems, updateCartSlide } = useCart();
  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div>
            <div className="wide-load">
              <div className="relative h-28 flex justify-between">
                <div className="relative px-2 flex lg:px-0">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" passHref>
                      <Image
                        className="h-16 no-underline"
                        src={Logo}
                        alt="Natural Playgrounds Logo"
                        width="161px"
                        height="100px"
                      />
                    </Link>
                  </div>
                </div>
                <div className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                  <div className="w-full sm:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        id="search"
                        name="search"
                        className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative  flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:flex lg:items-center space-x-4">
                  <Link href="/cart/" passHref>
                    <a className="no-underline">
                      <div
                        className="flex flex-row justify-between space-x-1 items-center hover:text-gray-500  no-underline"
                        onClick={() => updateCartSlide(true)}
                      >
                        <button className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400">
                          <span className="sr-only">View Shopping Cart</span>
                          <span className="inline-block relative">
                            <ShoppingCartIcon
                              className="h-8 w-8"
                              aria-hidden="true"
                            />
                            {totalItems > 0 && (
                              <span className="absolute top-0 right-0 h-5 w-5 transform -translate-y-1/2 translate-x-1/2 rounded-full ring-2 ring-white bg-dark-green flex justify-center items-center">
                                <span className="text-xs text-white">
                                  {totalItems}
                                </span>
                              </span>
                            )}
                          </span>
                        </button>
                        <p>Shopping Cart</p>
                      </div>
                    </a>
                  </Link>
                  <Link href="/account/" passHref>
                    <a className="flex flex-row justify-between space-x-1 items-center hover:text-gray-500  no-underline">
                      <button className="flex-shrink-0 bg-white rounded-full p-1 text-gray-400">
                        <span className="sr-only">View notifications</span>
                        <UserIcon className="h-8 w-8" aria-hidden="true" />
                      </button>
                      <p>My Account</p>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-yellow-gray flex flex-row">
              <div className="w-1/4"></div>
              <div className="bg-dark-green flex-1">
                <div className="wide-load">
                  <nav
                    className="hidden lg:py-2 lg:flex lg:space-x-8"
                    aria-label="Global"
                  >
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name} passHref>
                        <a
                          className={
                            "rounded-md py-2 px-3 inline-flex items-center text-sm uppercase font-medium text-white  no-underline"
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="pt-2 pb-3 px-2 space-y-1">
              {mobileNavigation.map((item) => (
                <Link href={item.href} key={item.name} passHref>
                  <a
                    className="block rounded-md py-2 px-3 text-base font-medium"
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
