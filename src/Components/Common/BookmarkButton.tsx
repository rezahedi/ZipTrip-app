import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { AddBookmark, removeBookmark } from "@/util/dashboard";
import { BookmarkIcon } from "lucide-react";

const BookmarkButton = ({
  planId,
  isBookmarked = false,
  setError,
}: {
  planId: string;
  isBookmarked?: boolean;
  setError: (errorMessage: string) => void;
}) => {
  const [bookmark, setBookmark] = useState(isBookmarked);
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  const handleBookmark = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!token) return openLogin();

    if (bookmark) {
      const result = await removeBookmark(token, planId, setError);
      if (result) {
        setBookmark(false);
      }
    } else {
      const result = await AddBookmark(token, planId, setError);
      if (result) {
        setBookmark(true);
      }
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="absolute top-2.5 right-2.5 size-9 bg-background/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-background"
    >
      <BookmarkIcon
        className={bookmark ? "text-accent fill-accent" : "text-ring"}
      />
      <div className="sr-only">
        {bookmark ? "Remove Bookmark" : "Add Bookmark"}
      </div>
    </button>
  );
};

export default BookmarkButton;
