import React, { lazy, Suspense } from "react";

const ImageGallery = lazy(() => import("./ImageGallery"));

const ImageBlock = ({
  className,
  images,
}: {
  className: string;
  images: string[];
}) => {
  return (
    <div className={className}>
      <Suspense
        fallback={
          <img
            src={images[0]}
            className="flex-none w-full h-full object-cover hover:scale-105 transition-all duration-200"
          />
        }
      >
        <ImageGallery images={images} />
      </Suspense>
    </div>
  );
};

export default ImageBlock;
