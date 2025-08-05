import React from "react";
import { Link } from "react-router-dom";
import BookmarkButton from "./BookmarkButton";

const PlanCard = ({
  planId,
  image,
  title,
  rate,
  type,
  distance,
  stopCount,
  isBookmarked = false,
  showBookmarkBtn = true,
}: {
  planId: string;
  image: string;
  title: string;
  rate?: number;
  type?: string;
  distance?: number;
  stopCount?: number;
  isBookmarked?: boolean;
  showBookmarkBtn?: boolean;
}) => {
  const setError = (errorMessage: string) => {
    console.log("error", errorMessage);
  };

  return (
    <Link to={`/plans/${planId}`} className="no-underline w-full">
      <div className="group h-full relative transition-shadow duration-200 ease-in-out shadow-md hover:shadow-lg rounded-lg overflow-hidden">
        <img
          src={image}
          className="h-48 w-full object-cover group-hover:scale-105 transition-all duration-200"
          height="195"
          alt={title}
        />
        {showBookmarkBtn && (
          <BookmarkButton {...{ planId, isBookmarked, setError }} />
        )}
        <div className="flex flex-col content-start p-4 gap-2">
          <h3 className="text-lg">{title}</h3>
          <div className="flex justify-start w-full gap-2 text-muted-foreground text-xs">
            <span>{rate}⭐</span>
            <span>{type}</span>
            <span>{distance} miles</span>
            <span>{stopCount} places</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PlanCard;
