import Image from "next/image";
export default function NaturalImage({ obj, image, alt_text }) {
  return (
    <div className="relative w-full h-full pt-12">
      {image && (
        <Image
          className="object-cover shadow-lg"
          src={image}
          alt={alt_text}
          layout="fill"
        />
      )}
    </div>
  );
}
