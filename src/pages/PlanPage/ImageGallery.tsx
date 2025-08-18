import React from "react";

const ImageGallery = ({
  className,
  images,
}: {
  className: string;
  images: string[];
}) => {
  return (
    <div className={className}>
      {images.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageGallery;
