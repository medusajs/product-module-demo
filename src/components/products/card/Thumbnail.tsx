import Image from "next/image";

type Props = {
  thumbnail?: string | null;
  alt?: string;
};

const Thumbnail = ({ thumbnail, alt = "" }: Props) => {
  return (
    <div className="w-full aspect-[121/72] relative bg-subtle-light dark:bg-subtle-dark overflow-hidden">
      <div className="absolute inset-0 rounded-t-2xl flex opacity-0 group-focus-within/card:opacity-100 group-hover/card:opacity-100 bg-overlay-light dark:bg-overlay-dark z-10 items-center justify-center transition-all">
        <p>View Product</p>
      </div>
      {thumbnail && (
        <div className="absolute inset-0 group-hover/card:blur-[2px] group-hover/card:scale-105 transition-transform ease-linear duration-300">
          <Image
            src={thumbnail}
            alt={alt}
            fill
            sizes="(max-width: 768px) 320px"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
