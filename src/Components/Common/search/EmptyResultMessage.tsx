import React from "react";

const EmptyResultMessage = () => {
  return (
    <div className="my-1">
      <p className="text-center text-lg">
        Found nothing! Try something more general to get better result in your
        search!
      </p>
      <img
        src="/images/welcome_search.webp"
        alt="Searching"
        title="Illustrated by Sushama Patel, Source: https://dribbble.com/shots/14285317-searching"
        className="my-2.5 mx-auto max-w-xl w-full h-auto"
      />
    </div>
  );
};

export default EmptyResultMessage;
