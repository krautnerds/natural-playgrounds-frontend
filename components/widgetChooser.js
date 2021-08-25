import Text from "./widget/text";
import NaturalImage from "./widget/images";
import Image from "next/image";
import Title from "./widget/title";
import Bark from "../images/bark.jpg";
import Manufacturing from "../images/manufacturing.png";
import Design from "../images/design.png";
export default function WidgetChooser({ obj }) {
  return (
    <>
      {obj.widget_type === "Image Left/Text Right" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row space-x-12">
          <div className="w-full md:w-1/2 h-full items-center align-center justify-center flex flex-col space-y-8">
            {obj.image_one_url && (
              <div className="relative w-full h-full">
                <NaturalImage image={obj.image_one_url} obj={obj} />
              </div>
            )}
            {obj.image_two_url && (
              <div className="relative w-2/3 flex justify-center">
                <NaturalImage image={obj.image_two_url} obj={obj} />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 h-full"></div>
        </div>
      )}
      {obj.widget_type === "Text Left/CTA Right" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row space-x-12">
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
      )}
      {obj.widget_type === "Testimonial" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row space-x-12">
          <div className="w-full md:w-1/2 h-full">
            {obj.image_one_url && (
              <NaturalImage obj={obj} image={obj.image_one_url} />
            )}
          </div>
          <div className="w-full md:w-1/2 h-full">
            <Text title={obj.title} content={obj.content} />
          </div>
        </div>
      )}
      {obj.widget_type === "Homepage Hero" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12">
          <div className="w-full md:w-1/2 h-full">
            <Text content={obj.homepage_left_text} />
          </div>
          <div className="w-full md:w-1/2 h-full">
            <Text content={obj.homepage_right_text} />
          </div>
        </div>
      )}
      {obj.widget_type === "Store" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row md:space-x-12">
          <div className="w-full justify-center flex flex-col items-center">
            <Title title="Shop our Store" />
          </div>
        </div>
      )}
      {obj.widget_type === "Services" && (
        <div className="flex flex-col md:space-x-12 services py-8 items-center">
          <div className="container max-w-7xl mx-auto">
            <div className="w-full justify-center flex flex-col items-center">
              <Title title={obj.title} />
            </div>
          </div>
          <div className="max-w-6xl mx-auto w-full">
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
                    src={obj.image_one_url}
                    alt={obj.image_one_alt_text}
                    layout="fill"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Wood Section" && (
        <div>
          <div className="relative sm:overflow-hidden">
            <div className="absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src={Bark}
                alt="Decorative Tree Bark"
              />
              <div className="absolute inset-0 "></div>
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8 flex flex-col  space-y-6">
              <div className="w-full justify-center flex flex-col items-center">
                <Title title={obj.title} added_class="wood" />
              </div>
              <div className="flex items-center mx-auto text-center">
                <Text content={obj.content} added_class="wood" />
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Learn More" && (
        <div className="flex flex-col md:space-x-12 learn-more py-6 max-w-6xl mx-auto w-full">
          <div>
            <div className="w-full flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative w-3/4 h-64">
                  {obj.image_one_url && (
                    <NaturalImage obj={obj} image={obj.image_one_url} />
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
                    <NaturalImage obj={obj} image={obj.image_two_url} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {obj.widget_type === "Videos" && (
        <div className="container max-w-7xl mx-auto flex flex-col">
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
      )}
    </>
  );
}
