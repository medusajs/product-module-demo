import NextImage from "next/image";

type ImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

const Image = ({ src, alt, className }: ImageProps) => {
  return (
    <div
      className={`relative aspect-[89/60] w-full h-full rounded-2xl overflow-hidden bg-base-light dark:bg-base-dark ${className}`}
    >
      {src && (
        <NextImage
          src={src}
          alt={alt}
          fill
          className="absolute inset-0 object-cover"
          sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
          quality={60}
          priority
        />
      )}
    </div>
  );
};

export default Image;
