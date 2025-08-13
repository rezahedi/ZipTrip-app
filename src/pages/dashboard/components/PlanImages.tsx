import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import IB from "@/Components/ui/IconButton";
import { PlusIcon, TrashIcon } from "lucide-react";

const PlanImages = ({
  images,
  setImages,
}: {
  images: string[];
  setImages: (images: string[]) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddImage = () => {
    if (!inputRef) return;

    setImages([...images, inputRef.current!.value || ""]);
    inputRef.current!.value = "";
    inputRef.current!.focus();
  };

  const handleDeleteImage = (imageIndex: number) => {
    const newImages = [...images];
    newImages.splice(imageIndex, 1);
    setImages(newImages);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(event.target.dataset.index);
    const newImages = [...images];
    newImages[index] = event.target.value;
    setImages(newImages);
  };

  return (
    <>
      <label className="font-bold mb-0.5">Images *</label>
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <div key={index} className="flex gap-0.5 items-end">
            <input
              type="text"
              className="w-full border rounded-sm p-2"
              required
              placeholder="Enter the full image URL"
              value={image}
              data-index={index}
              onChange={handleImageChange}
            />
            <IB
              aria-label="Remove Image"
              onClick={() => handleDeleteImage(index)}
            >
              <TrashIcon />
            </IB>
          </div>
        ))}
        <div className="flex items-end gap-0.5">
          <input
            className="w-full border rounded-sm p-2"
            ref={inputRef}
            required={images.length === 0}
            placeholder="Enter the full image URL"
          />
          <IB aria-label="Add Image" onClick={handleAddImage}>
            <PlusIcon />
          </IB>
        </div>
      </div>
    </>
  );
};

export default PlanImages;
