import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function Drawer({ product, three, category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [transitionExit, setTransitionExit] = useState(false);

  const handleExit = () => {
    setTransitionExit(true);
    setTimeout(() => {
      setIsOpen(false);
      setTransitionExit(false);
      // timeout should be less than animation time otherwise state might still be true
      // after animation ends and drawer appears for few milliseconds
    }, 500);
  };
  return (
    <div className="gray-outline">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="relative"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`${three === 0 ? "ml-2" : "mr-2"}`}
        >
          <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            {isOpen ? (
              <div>
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={`Product Image for ${product.name}`}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                    layout="fill"
                  />
                ) : (
                  <div className="w-full h-full object-center object-cover sm:w-full sm:h-full"></div>
                )}
              </div>
            ) : (
              <div>
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={`Category Image for ${category.name}`}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                    layout="fill"
                  />
                ) : (
                  <div className="w-full h-full object-center object-cover sm:w-full sm:h-full"></div>
                )}
              </div>
            )}
          </div>
          <div>
            {isOpen ? (
              <p className="font-light text-md pt-2">{product.name}</p>
            ) : (
              <p className="font-light text-md pt-2">{category.name}</p>
            )}
          </div>
        </div>
        {isOpen && (
          <div
            className={`flex flex-row drawer_container ${
              transitionExit ? "exit" : ""
            } ${three === 0 ? "right" : "left"}`}
          >
            <div
              onClick={handleExit}
              className={`drawer ${
                transitionExit ? "exit" : ""
              } flex flex-col justify-start space-y-4`}
            >
              <h3 className="uppercase text-blue-green font-normal text-xl text-center">
                {product.name}
              </h3>
              <Link href={product.link}>
                <a className="button no-underline">View</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
