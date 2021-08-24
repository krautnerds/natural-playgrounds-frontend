import Image from "next/image";
export default function Text({ obj }) {
  return (
    <div className="relative w-full h-full pt-12">
      <Image
        className="object-cover shadow-lg"
        src={obj.image_one_url}
        alt=""
      />
    </div>
  );
}
