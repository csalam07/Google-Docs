import Image from "next/image";

function Card({ image, title, subTitle }) {
  return (
    <div className="">
      <div className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
        <Image src={image} layout="fill" />
      </div>
      <div>
        <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">{title}</p>
        <p className="ml-2 mb-4 text-sm text-gray-300">{subTitle}</p>
      </div>
    </div>
  );
}

export default Card;
