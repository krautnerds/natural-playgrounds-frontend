import Image from "next/image";
export default function SectionGrid({ title, logo, content, image }) {
  return (
    <div className="h-full bg-sand flex flex-col pt-6 section-grid">
      {image && (
        <div className="p-8 flex justify-center mx-auto">
          <div className="relative h-16 w-16 ">
            <Image className="object-cover " src={logo} alt="" layout="fill" />
          </div>
        </div>
      )}
      <div className="px-8 flex justify-center text-center">
        <h2 className="font-bold text-2xl text-gray-900">{title}</h2>
      </div>
      <div
        className={`prose p-8 flex flex-col justify-center flex-1`}
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div>
        <div className="aspect-w-3 aspect-h-2 h-32 relative">
          <Image
            className="object-cover"
            src={image}
            alt="Image related to the corresponding service"
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}
