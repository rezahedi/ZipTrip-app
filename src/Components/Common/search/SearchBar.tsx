import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getQueryValue } from "@/util/url";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { SearchIcon, XIcon as CloseIcon } from "lucide-react";

const SearchBar = () => {
  const location = useLocation();
  let q = getQueryValue(location.search, "q");
  const [searchQuery, setSearchQuery] = useState<string>(q);
  const navigate = useNavigate();

  useEffect(() => {
    q = getQueryValue(location.search, "q");
    setSearchQuery(q);
  }, [location.search]);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery) return;

    navigate(`/search?q=${searchQuery}`);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchQuery("");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-2 -translate-y-1/2">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          placeholder="Search for a city, activity, or place"
          value={searchQuery || ""}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full mx-auto rounded-4xl shadow-lg bg-background border border-ring px-14 py-7 text-lg md:text-lg"
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute left-2 top-1/2 -translate-y-1/2 size-10 cursor-pointer hover:bg-transparent hover:*:text-foreground  rounded-4xl"
        >
          <SearchIcon className="size-6 text-ring" />
        </Button>
        {q && (
          <Button
            onClick={handleCancel}
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 size-10 cursor-pointer hover:bg-transparent hover:*:text-foreground rounded-full"
          >
            <CloseIcon className="size-6 text-ring" />
          </Button>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
