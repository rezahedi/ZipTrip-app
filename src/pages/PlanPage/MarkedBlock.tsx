import React from "react";

const MarkedBlock = ({
  isLastOne = false,
  children,
}: {
  isLastOne?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex gap-5 py-2">
      <div className="flex flex-col items-center">
        <img
          className="sticky top-0 size-7 box-content bg-background border-b-6 border-background"
          src="/places/emoji_marker.svg"
        />
        {/* <MapPinIcon className="text-primary mt-1 size-6" /> */}
        {!isLastOne && <div className="flex-1 w-0.5 bg-foreground/20"></div>}
      </div>
      <div className="grow pb-5">{children}</div>
    </div>
  );
};

export default MarkedBlock;
