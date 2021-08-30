import Image from "next/image";
export default function NaturalImage({ obj, image, alt_text }) {
  return (
    <div className="relative w-full h-full pt-12 image">
      {image && (
        <Image
          className="object-cover shadow-lg"
          src={image}
          alt={alt_text}
          placeholder="blur"
          blurDataURL="LWGuj#%LNuax9ZRjjrah~pWXs:j]"
          layout="fill"
        />
      )}
    </div>
  );
}
