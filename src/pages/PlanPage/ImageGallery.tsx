import React, { useRef, useState } from "react";
import { ImagesIcon, ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

const ImageGallery = ({ images }: { images: string[] }) => {
  const galleryRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(1);

  const nextImage = () => {
    if (!galleryRef.current) return;

    const galleryElement: HTMLElement = galleryRef.current;
    galleryElement.scrollBy({
      left: galleryElement.offsetWidth,
      behavior: "smooth",
    });

    setCurrentImage((prev) => (prev + 1 <= images.length ? prev + 1 : prev));
  };
  const prevImage = () => {
    if (!galleryRef.current) return;

    const galleryElement: HTMLElement = galleryRef.current;
    galleryElement.scrollBy({
      left: -galleryElement.offsetWidth,
      behavior: "smooth",
    });

    setCurrentImage((prev) => (prev - 1 > 0 ? prev - 1 : prev));
  };

  return (
    <div className="relative">
      <div ref={galleryRef} className="overflow-hidden flex">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="flex-none w-full object-cover"
          />
        ))}
      </div>
      <button
        className="absolute top-0 left-0 cursor-pointer w-1/2 h-full bg-gradient-to-l hover:from-transparent hover:to-foreground/50 flex items-center"
        onClick={prevImage}
        aria-label="Show Previous Image"
      >
        <ChevronLeftIcon className="size-12 stroke-1 text-background" />
      </button>
      <button
        className="absolute top-0 right-0 cursor-pointer w-1/2 h-full bg-gradient-to-r hover:from-transparent hover:to-foreground/50 flex items-center justify-end"
        onClick={nextImage}
        aria-label="Show Next Image"
      >
        <ChevronRightIcon className="size-12 stroke-1 text-background" />
      </button>
      <div className="absolute left-4 bottom-4 text-background text-lg font-semibold bg-foreground/50 hover:bg-foreground/80 p-2 px-5 flex items-center gap-3">
        <ImagesIcon className="size-6" />
        {currentImage}/{images.length} images
      </div>
    </div>
  );
};

export default ImageGallery;
