import Tree from "../images/tree.jpeg";
import Image from "next/image";
export default function Hero({ title, sub_title }) {
  return (
    <div className="relative bg-white">
      <div className="wide-load">
        <div className="relative pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-6xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20">
            <div className="sm:text-center lg:text-left">
              <div style={{ maxWidth: "500px" }}>
                <h1 className="text-natural-red">{title}</h1>
              </div>
              {sub_title && (
                <div className="mt-3">
                  <h3 className="sub-title">{sub_title}</h3>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 hidden md:block">
        <div className="hero">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full relative"
            src={Tree}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
