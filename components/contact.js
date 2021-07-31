import Link from "next/link";
import { social } from "./social";
export default function Contact() {
  return (
    <div className="bg-light-gray border-b-2 border-gray-400 py-4">
      <div className="wide-load flex flex-row">
        <div className="w-1/2 flex flex-row items-center space-x-6">
          <p>Follow Us</p>
          <div className="flex space-x-6">
            {social.map((item) => (
              <Link href={item.href}>
                <a
                  key={item.name}
                  className="text-gray-400 hover:text-gray-500  text-center"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-row justify-end space-x-8">
          <div>
            <Link href="/contact/">
              <a>Contact Us</a>
            </Link>
          </div>
          <div>
            <Link href="/products/">
              <a>Shop</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
