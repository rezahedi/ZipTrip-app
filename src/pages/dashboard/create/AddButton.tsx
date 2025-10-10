import { Button } from "@/Components/ui/button";
import React from "react";
import { CheckIcon } from "lucide-react";

const AddButton = ({
  isAdded = false,
  onClick,
}: {
  isAdded?: boolean;
  onClick: () => void;
}) => {
  if (isAdded)
    return (
      <Button
        size="sm"
        className={`mt-2 bg-transparent text-primary border`}
        disabled={isAdded}
      >
        <CheckIcon /> Added
      </Button>
    );

  return (
    <Button size="sm" className="mt-2" onClick={onClick}>
      Add to Itinerary
    </Button>
  );
};

export default AddButton;
