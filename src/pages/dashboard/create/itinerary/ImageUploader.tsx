import React, { useState, useRef } from "react";
import { useItinerary } from "@/context/ItineraryContext";
import { useAuth } from "@/context/AuthContext";

const MAX_SIZE_2MB = 2097152;

const ImageUploader = () => {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageDataURL, setImageDataURL] = useState<string | null>(null);
  const { plan, addImage } = useItinerary();
  const { user } = useAuth();

  const handleUpload = async (file: File) => {
    if (!file || !plan || !user) return;

    setError(null);

    if (file.size > MAX_SIZE_2MB) {
      return setError(
        `File size is too big (max ${Math.round(MAX_SIZE_2MB / 1024 / 1024)}MB)`,
      );
    }

    setImageDataURL(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/account/plans/${plan._id}/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      },
    );
    const { imageURL } = await res.json();
    // FIXME: image url already added to plan document in api backend, so addImage() is pointless
    // But I need to somehow update plan state without triggering updatePlan() WHAAAT?!
    addImage(imageURL);
    setImageDataURL(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleClick = () => {
    if (!inputRef?.current) return;
    (inputRef?.current as HTMLInputElement).click();
  };

  return (
    <>
      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`my-2 border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition
        ${isDragging ? "border-primary bg-primary/20" : "border-border hover:border-primary"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <p className="text-gray-600">
          {isDragging ? "Drop it here!" : "Drag & drop photos here."}
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {plan &&
          plan.images &&
          plan.images.length > 0 &&
          plan?.images?.map((image, index) => <img key={index} src={image} />)}
        {imageDataURL && <img src={imageDataURL} />}
      </div>
    </>
  );
};

export default ImageUploader;
