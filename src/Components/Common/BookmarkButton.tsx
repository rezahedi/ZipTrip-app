import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { AddBookmark, removeBookmark } from "@/util/dashboard";
import { BookmarkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <button
      onClick={handleBookmark}
      className={cn(
        "size-9 bg-background/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-background",
        className,
      )}
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
