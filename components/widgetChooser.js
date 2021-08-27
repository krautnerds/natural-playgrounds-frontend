import Text from "./widget/text";
import NaturalImage from "./widget/images";
import Link from "next/link";
import Image from "next/image";
import Title from "./widget/title";
import Leaf from "../images/leaf.jpg";
import Bark from "../images/bark.jpg";
import Manufacturing from "../images/manufacturing.png";
import Design from "../images/design.png";
export default function WidgetChooser({ obj }) {
  return (
    <>
      {obj.widget_type === "Image/Text" && (
        <div className="relative">
          <div className="wide-load flex flex-col md:flex-row space-x-12">
            <div className="w-full md:w-1/2 h-full items-center align-center justify-center flex flex-col space-y-8">
              {obj.image_one_url && (
                <div className="w-full  flex justify-start">
                  <div className="relative w-3/4 h-96">
                    {obj.image_one_url && (
                      <NaturalImage obj={obj} image={obj.image_one_url} />
                    )}
                  </div>
                </div>
              )}
              {obj.image_two_url && (
                <div className="w-full  flex justify-start">
                  <div className="relative w-3/4 h-96">
                    {obj.image_two_url && (
                      <NaturalImage obj={obj} image={obj.image_two_url} />
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Text title={obj.title} content={obj.content} />
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Text Left/CTA Right" && (
        <div className="relative">
          <div className="wide-load flex flex-col md:flex-row space-x-12">
            <div className="w-full md:w-1/2 h-full">
              <Text title={obj.title} content={obj.content} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center py-8">
              <h2>{obj.cta_title}</h2>
              <div className="py-4">
                <button>{obj.cta_text}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Testimonial" && (
        <div className="relative">
          <div className="wide-load flex flex-col md:flex-row space-x-12">
            <div className="w-full md:w-1/2 h-full">
              {obj.image_one_url && (
                <NaturalImage obj={obj} image={obj.image_one_url} />
              )}
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Text title={obj.title} content={obj.content} />
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Homepage Hero" && (
        <div className="relative">
          <div className="wide-load flex flex-col md:flex-row md:space-x-12">
            <div className="w-full md:w-1/2 h-full">
              <Text content={obj.homepage_left_text} />
            </div>
            <div className="w-full md:w-1/2 h-full">
              <Text content={obj.homepage_right_text} />
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Store" && (
        <div className="relative">
          <div className="wide-load">
            <div className="w-full justify-center flex flex-col items-center">
              <Title title="Shop our Store" />
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Services" && (
        <div className="relative">
          <div className="flex flex-col md:space-x-12 services py-8 items-center">
            <div className="container max-w-6xl mx-auto">
              <div className="w-full justify-center flex flex-col items-center">
                <Title title={obj.title} />
              </div>
            </div>
            <div className="wide-load w-full">
              <div className="w-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-3/4 h-64">
                    <Image
                      className="object-cover "
                      src={obj.image_one_url}
                      alt={obj.image_one_alt_text}
                      layout="fill"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col space-y-12 items-center">
                  <div className="flex flex-col items-center">
                    <Image src={Manufacturing} width={50} height={50} />
                    <h3 className="mt-4">Manufacturing</h3>
                  </div>
                  <div className="flex flex-col items-center">
                    <Image src={Design} width={50} height={50} />
                    <h3 className="mt-4">Design</h3>
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-3/4 h-64">
                    <Image
                      className="object-cover"
                      src={obj.image_two_url}
                      alt={obj.image_two_alt_text}
                      layout="fill"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Full Width Text" && (
        <div className="relative">
          <div className="wide-load flex flex-col space-y-6">
            <div className="w-full justify-center flex flex-col items-center">
              <Title title={obj.title} added_class="full-text" />
            </div>
            <div className="w-full flex">
              <Text content={obj.content} added_class="full-text" />
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Leafs" && (
        <div className="relative">
          <div className="wide-load flex flex-col space-y-6">
            <div className="w-full justify-center flex flex-col items-center">
              <Title title={obj.title} added_class="full-text" />
            </div>
            <div className="space-y-12 sm:grid grid-cols-1 sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
              {Object.keys(obj.leafs).map((key) => (
                <div className="relative flex items-start space-x-3" key={key}>
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src={Leaf}
                      alt=""
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-lg font-medium text-gray-900">
                      {obj.leafs[key].content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Full Width CTA" && (
        <div className="relative">
          <div className="wide-load flex flex-col space-y-6">
            <div className="w-full justify-center flex flex-col items-center">
              <Link href={obj.cta_link}>
                <a className="relative border-8 border-dark-green px-16 py-6 overflow-hidden no-underline">
                  <div className="absolute inset-0">
                    <Image
                      className="w-full h-full object-cover"
                      src={Bark}
                      alt="CTA Bark"
                    />
                  </div>
                  <p className="relative font-bold text-lg uppercase">
                    {obj.cta_text}
                  </p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Full Width Image" && (
        <div>
          <div className="relative h-[500px]">
            <div className="absolute inset-0">
              {obj.image_one_url && (
                <Image
                  className="h-full w-full object-cover z-[10000]"
                  src={obj.image_one_url}
                  alt={obj.image_one_alt_text}
                  layout="fill"
                />
              )}
              <div className="absolute inset-0"></div>
            </div>
            <div className="absolute top-[-16px] h-16 bg-tan w-[85%] mx-auto flex justify-center left-[10%]"></div>
            <div className="absolute bottom-[-16px] h-16 bg-tan w-[85%] mx-auto flex justify-center left-[10%]"></div>
          </div>
        </div>
      )}
      {obj.widget_type === "Wood Section" && (
        <div className="mt-0 pt-12">
          <div className="relative sm:overflow-hidden">
            <div className="absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src={Bark}
                alt="Decorative Tree Bark"
              />
              <div className="absolute inset-0 "></div>
            </div>
            <div className="relative">
              <div className="flex flex-col space-y-6 pb-6 wide-load">
                <div className="w-full justify-center flex flex-col items-center wide-load">
                  <Title title={obj.title} added_class="wood" />
                </div>
                <div className="flex items-center mx-auto text-center wide-load">
                  <Text content={obj.content} added_class="wood" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Learn More" && (
        <div className="relative">
          <div className="flex flex-col md:space-x-12 learn-more py-6 wide-load w-full">
            <div>
              <div className="w-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-3/4 h-64">
                    {obj.image_one_url && (
                      <NaturalImage
                        obj={obj}
                        image={obj.image_one_url}
                        alt_text={obj.image_one_alt_text}
                      />
                    )}
                  </div>
                </div>
                <div className="w-full md:w-1/3 flex flex-col space-y-4 items-center">
                  <Title title={obj.title} added_class="learn-more" />
                  <p>Our Company</p>
                  <p>Everything else about Natural Playgrounds</p>
                </div>
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative w-3/4 h-64">
                    {obj.image_two_url && (
                      <NaturalImage
                        obj={obj}
                        image={obj.image_two_url}
                        alt_text={obj.image_two_alt_text}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Videos" && (
        <div className="relative">
          <div className="wide-load flex flex-col">
            <div className="w-full justify-center flex flex-col items-center">
              <Title title="Videos" />
            </div>
            <div className="w-full flex flex-wrap md:space-x-12">
              {obj.video_link_one && (
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <div className="relative w-full h-64"></div>
                </div>
              )}
              {obj.video_link_two && (
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <div className="relative w-full h-64"></div>
                </div>
              )}
              {obj.video_link_three && (
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <div className="relative w-full h-64"></div>
                </div>
              )}
              {obj.video_link_four && (
                <div className="w-full md:w-1/2 lg:w-1/4">
                  <div className="relative w-full h-64"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
