import React from "react";

function NotFound404() {
  return (
    <div className="my-1">
      <p className="text-center text-lg">
        The page you are looking for is not found!
      </p>
      <img
        src="/images/welcome_search.webp"
        alt="Searching"
        title="Illustrated by Sushama Patel, Source: https://dribbble.com/shots/14285317-searching"
        className="my-2.5 mx-auto max-w-xl w-full h-auto"
      />
    </div>
  );
}

export default NotFound404;
