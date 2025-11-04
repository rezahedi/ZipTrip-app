import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { AddBookmark, removeBookmark } from "@/util/dashboard";
import { BookmarkIcon } from "lucide-react";
import IconButton from "../ui/IconButton";

const BookmarkButton = ({
  planId,
  isBookmarked = false,
  setError,
  className = "",
}: {
  planId: string;
  isBookmarked?: boolean;
  setError: (errorMessage: string) => void;
  className?: string;
}) => {
  const [bookmark, setBookmark] = useState(isBookmarked);
  const { token } = useAuth();
  const { openLogin } = useAuthModal();

  useEffect(() => {
    setBookmark(isBookmarked);
  }, [isBookmarked]);

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
    <IconButton
      onClick={handleBookmark}
      variant="ghost"
      className={className}
      title="Bookmark"
    >
      <BookmarkIcon
        className={bookmark ? "text-accent fill-accent" : "text-ring"}
      />
      <div className="sr-only">
        {bookmark ? "Remove Bookmark" : "Add Bookmark"}
      </div>
    </IconButton>
  );
};

export default BookmarkButton;
