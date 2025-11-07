import React from "react";
import SearchBar from "../Common/search/SearchBar";

const Banner = () => (
  <>
    <div className="bg-[url('/images/main-header.jpg')] bg-cover bg-center h-56 flex justify-center items-center rounded-xl overflow-hidden">
      <h4 className="text-white text-center text-2xl sm:text-4xl w-full h-full flex items-center justify-center bg-foreground/20">
        Plan your perfect day with ease!
      </h4>
    </div>
    <SearchBar />
  </>
);

export default Banner;
