import { Image } from "@/components";
import { Image as MedusaImage } from "@medusajs/medusa";

type GalleryProps = {
  images?: MedusaImage[] | null;
};

const Gallery = ({ images }: GalleryProps) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      {images?.map((image, index) => {
        return <Image key={index} src={image.url} alt={""} />;
      })}
    </div>
  );
};

export default Gallery;
