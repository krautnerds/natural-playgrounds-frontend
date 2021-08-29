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
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=1024&amp;h=1024&amp;q=80"
            alt=""
            layout="fill"
          />
        </div>
      </div>
    </div>
  );
}
