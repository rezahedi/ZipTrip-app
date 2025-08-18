import React from "react";
import { MapPinIcon } from "lucide-react";

const MarkedBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex gap-5 py-2">
      <div className="flex flex-col items-center gap-3">
        <MapPinIcon className="text-primary size-6" />
        <div className="flex-1 w-0.5 bg-foreground/20"></div>
      </div>
      <div className="grow pb-5">{children}</div>
    </div>
  );
};

export default MarkedBlock;
