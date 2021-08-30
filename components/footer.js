import Image from "next/image";
import Logo from "../images/logo.png";
import Social from "./social";
const navigation = {
  learn_more: [
    { name: "Success Stories", href: "/stories" },
    { name: "FAQ", href: "/faq" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "News & Articles", href: "/news" },
  ],
  resources: [
    { name: "For Homeowners", href: "/homeowners" },
    { name: "For Constructors", href: "/construction" },
    { name: "Employment", href: "/employment" },
  ],
  policies: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/toc" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="wide-load py-12 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div>
              <h3 className="uppercase text-3xl">Contact Us</h3>
              <p className="text-gray-500 text-base">
                Email:{" "}
                <a href="mailto:info@naturalplaygrounds.com">
                  info@naturalplaygrounds.com
                </a>
              </p>
            </div>

            <div className="flex space-x-6">
              <Social classProps="h-6 w-6 text-gray-500 hover:text-gray-800 cursor-pointer" />
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-dark-green">
                  Learn More
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.learn_more.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-light-green hover:text-dark-green no-underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-dark-green">
                  Resources
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-light-green hover:text-dark-green  no-underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-dark-green">
                  Policies
                </h3>
                <ul className="mt-4 space-y-4">
                  {navigation.policies.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-light-green hover:text-dark-green no-underline"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end mt-4">
          <div>
            <Image
              className="h-10"
              src={Logo}
              alt="Natural Playgrounds Logo"
              width="250px"
              height="150px"
            />
            <p className="text-sm ">
              &copy; 2013 - {new Date().getFullYear()} Natural Playgrounds
              Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
