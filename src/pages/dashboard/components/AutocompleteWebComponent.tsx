import React, { Dispatch, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const AutocompleteWebComponent = ({
  onPlaceSelect,
}: {
  onPlaceSelect: Dispatch<google.maps.LatLngBounds | null>;
}) => {
  const ref = useRef<HTMLElement | null>(null);

  useMapsLibrary("places");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleGmpSelect = async (ev) => {
      const placePrediction = ev.placePrediction;
      if (!placePrediction) return;

      const place = await placePrediction.toPlace();
      await place.fetchFields({
        fields: ["displayName", "formattedAddress", "location", "viewport"],
      });

      onPlaceSelect(place.viewport);
    };

    el.addEventListener("gmp-select", handleGmpSelect);

    return () => {
      el.removeEventListener("gmp-select", handleGmpSelect);
    };
  }, [onPlaceSelect]);

  return (
    <div
      className="autocomplete-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <p>Search:</p>
      <div style={{ flex: 1 }}>
        <gmp-place-autocomplete ref={ref} placeholder="Enter an address" />
      </div>
    </div>
  );
};

AutocompleteWebComponent.propTypes = {
  onPlaceSelect: PropTypes.func.isRequired,
};

export default AutocompleteWebComponent;

// Add custom element type for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "gmp-place-autocomplete": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { ref?: React.Ref<HTMLElement>; placeholder?: string };
    }
  }
}
