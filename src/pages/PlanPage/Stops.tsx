import React from "react";
import Stop from "./Stop";
import { Stop as StopType } from "@/types";
import MarkedBlock from "./MarkedBlock";

const Stops = ({ stops }: { stops: StopType[] }) => {
  return (
    <div className="mt-4 w-full max-w-3xl">
      <h4 className="text-4xl mb-2">Activities</h4>
      <MarkedBlock>
        <h5 className="text-2xl">Start Point</h5>
      </MarkedBlock>
      {stops.map((stop, index) => (
        <MarkedBlock key={index}>
          <Stop detail={stop} />
        </MarkedBlock>
      ))}
      <MarkedBlock>
        <h5 className="text-2xl">Finish Point</h5>
      </MarkedBlock>
    </div>
  );
};

export default Stops;
