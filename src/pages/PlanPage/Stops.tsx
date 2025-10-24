import React, { useCallback, useEffect, useRef } from "react";
import Stop from "./Stop";
import { Stop as StopType } from "@/types";
import MarkedBlock from "./MarkedBlock";
import { useMapSync } from "@/context/MapSyncContext";

const Stops = ({ stops }: { stops: StopType[] }) => {
  const refs = useRef(new Map());
  const { selection } = useMapSync();

  const setRef = useCallback((id: string, element: HTMLDivElement | null) => {
    if (element) {
      refs.current.set(id, element);
    } else {
      refs.current.delete(id);
    }
  }, []);

  const getRef = (id: string) => {
    return refs.current.get(id);
  };

  useEffect(() => {
    if (!selection || selection.source === "card") return;

    const targetElement = getRef(selection.placeId);
    if (!targetElement) return;

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [selection]);

  return (
    <div className="mt-4 w-full max-w-3xl">
      <h4 className="text-4xl mb-2">Activities</h4>
      <MarkedBlock>
        <h5 className="text-2xl">Start Point</h5>
      </MarkedBlock>
      {stops.map((stop) => (
        <MarkedBlock key={stop.placeId}>
          <div ref={(element) => setRef(stop.placeId, element)}>
            <Stop detail={stop} />
          </div>
        </MarkedBlock>
      ))}
      <MarkedBlock isLastOne>
        <h5 className="text-2xl">Finish Point</h5>
      </MarkedBlock>
    </div>
  );
};

export default Stops;
