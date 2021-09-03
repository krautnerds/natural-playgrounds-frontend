import Tree from "../images/tree.jpeg";
import Image from "next/image";
export default function Hero({ title, sub_title }) {
  return (
    <div className="relative bg-white">
      <div className="wide-load">
        <div className="relative pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-10 mx-auto max-w-6xl sm:pt-12 md:pt-16 lg:pt-20">
            <div className="text-left">
              <div className="max-w-full sm:max-w-[200px] lg:max-w-[500px]">
                <h1 className="text-natural-red  relative z-50">{title}</h1>
              </div>
              {sub_title && (
                <div className="mt-3">
                  <h3 className="sub-title relative z-50">{sub_title}</h3>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <div className="md:absolute md:inset-y-0 md:right-0 md:w-3/4 hidden md:block">
        <div className="hero">
          <Image
            className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full relative"
            src={Tree}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
