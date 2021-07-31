import Head from "next/head";
import Layout from "../../components/layout";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
export default function Product({ product }) {
  const { slug, name, item_code, description } = product;
  const faqs = [
    {
      question: "Item Dimensions",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
    {
      question: "Item Directions",
      answer:
        "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Layout>
      <main className="wide-load py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-x-0 xl:gap-8">
          <div className="col-span-2 md:col-span-1">
            <h1 className="text-3xl font-bold">{name}</h1>
          </div>
          <div className="flex flex-col space-y-4 md:col-span-1 col-span-2">
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: description }}
            ></div>

            <button className="w-full py-4 bg-dark-green text-white">
              Add to Cart
            </button>
            <div className="mt-8">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question}>
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                          <span className="font-medium text-gray-900">
                            {faq.question}
                          </span>
                          <span className="ml-6 h-7 flex items-center">
                            <ChevronDownIcon
                              className={classNames(
                                open ? "-rotate-180" : "rotate-0",
                                "h-6 w-6 transform"
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 pr-12">
                        <p className="text-base text-gray-500">{faq.answer}</p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.API_URL}/api/products/${params.slug}/`
  );
  return {
    props: {
      product: await res.json(),
    },
  };
}
export async function getStaticPaths() {
  console.log(process.env.API_URL);
  const res = await fetch(`${process.env.API_URL}/api/products/`);
  const products = await res.json();
  const paths = products.map((product) => {
    return {
      params: {
        slug: product.slug.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
