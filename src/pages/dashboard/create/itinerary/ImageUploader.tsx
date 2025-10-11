import React, { useState, useEffect } from "react";
import { useItinerary } from "@/context/ItineraryContext";
import { useAuth } from "@/context/AuthContext";

const MAX_SIZE_2MB = 2097152;

const ImageUploader = () => {
  const [error, setError] = useState<string | null>(null);
  const [imageDataURL, setImageDataURL] = useState<string | null>(null);
  const { plan, addImage } = useItinerary();
  const { user } = useAuth();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!plan || !user) return;

    setError(null);
    const file = e.target.files?.[0];

    if (!file) return;

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

  return (
    <>
      <label htmlFor="file-upload">Upload an image for your trip:</label>
      <input
        id="file-upload"
        onChange={handleUpload}
        type="file"
        accept="image/*"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
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
