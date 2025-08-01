import React from "react";

const WelcomeMessage = () => {
  return (
    <div className="my-1">
      <p className="text-center text-lg">
        Use search bar to look for your next amazing adventure!
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

export default WelcomeMessage;
