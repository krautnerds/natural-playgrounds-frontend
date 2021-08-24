import Text from "./widget/text";
import Image from "next/image";
export default function WidgetChooser({ obj }) {
  return (
    <>
      {obj.widget_type === "Image Left/Text Right" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row space-x-12">
          <div className="w-full md:w-1/2 h-full items-center align-center justify-center flex flex-col space-y-8">
            {obj.image_one_url && (
              <div className="relative w-full h-full">
                <Image
                  className="object-cover shadow-lg"
                  src={obj.image_one_url}
                  alt=""
                />
              </div>
            )}
            {obj.image_two_url && (
              <div className="relative w-2/3 flex justify-center">
                <Image
                  className="object-cover shadow-lg"
                  src={obj.image_two_url}
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 h-full"></div>
        </div>
      )}
      {obj.widget_type === "Text Left/CTA Right" && (
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row space-x-12">
          <div className="w-full md:w-1/2 h-full">
            <Text obj={obj} />
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
            {obj.image_one_url && <Image obj={obj} />}
          </div>
          <div className="w-full md:w-1/2 h-full">
            <Text obj={obj} />
          </div>
        </div>
      )}
    </>
  );
}
