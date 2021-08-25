import Image from "next/image";
export default function NaturalImage({ obj, image }) {
  return (
    <div className="relative w-full h-full pt-12">
      {image && (
        <Image
          className="object-cover shadow-lg"
          src={image}
          alt=""
          layout="fill"
        />
      )}
    </div>
  );
}
