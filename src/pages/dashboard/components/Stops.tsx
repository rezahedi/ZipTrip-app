import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import IconButton from "@/Components/ui/IconButton";
import MapDialog from "./MapDialog";
import StopDialog from "./StopDialog";
import { PassingStop } from "@/util/dashboard";
import {
  TrashIcon,
  MapIcon,
  BaselineIcon,
  NotebookPenIcon,
  ImagePlusIcon,
} from "lucide-react";

const Stops = ({
  stops,
  setStops,
}: {
  stops: PassingStop[];
  setStops: (stops: PassingStop[]) => void;
}) => {
  const [isMapDialogOpen, setIsMapDialogOpen] = useState(false);
  const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);

  const handleDeleteStop = (stopIndex: number) => {
    const newStops = [...stops];
    newStops.splice(stopIndex, 1);
    setStops(newStops);
  };

  const handleStopChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const index = Number(event.target.dataset.index);
    const type = event.target.dataset.type as keyof PassingStop | undefined;
    if (index === undefined || type === undefined) return;
    const newStops = [...stops];
    newStops[index] = {
      ...newStops[index],
      [type]: event.target.value,
    };
    setStops(newStops);
  };

  const handleOpenMap = () => {
    setIsMapDialogOpen(true);
  };

  const handleCloseMap = () => {
    setIsMapDialogOpen(false);
  };

  const handleAddPlaceConfirm = (stop: PassingStop) => {
    setStops([...stops, stop]);
    setIsMapDialogOpen(false);
  };

  const handleOpenStop = () => {
    setIsStopDialogOpen(true);
  };
  const handleCloseStop = () => {
    setIsStopDialogOpen(false);
  };
  const handleAddManuallyConfirm = (stop: PassingStop) => {
    setStops([...stops, stop]);
    setIsStopDialogOpen(false);
  };

  return (
    <>
      <label className="font-bold mb-1">Stops *</label>
      <div className="flex flex-col gap-2">
        {stops.map((stop, index) => (
          <div
            className="flex items-center gap-1 bg-foreground/5 rounded-sm p-2"
            key={index}
          >
            <img
              src={stop.imageURL}
              alt={stop.name}
              className="rounded-md w-[120px] h-[110px] object-contain bg-foreground"
            />
            <div className="flex flex-col gap-1 grow">
              <input
                required
                placeholder="Enter the name"
                value={stop.name}
                data-type="name"
                data-index={index}
                onChange={handleStopChange}
                className="w-full border rounded-sm bg-background py-1 px-2"
              />
              <input
                required
                placeholder="Enter the image URL"
                value={stop.imageURL}
                data-type="imageURL"
                data-index={index}
                onChange={handleStopChange}
                className="w-full border rounded-sm bg-background py-1 px-2"
              />
              <input
                required
                placeholder="Enter the address"
                value={stop.address}
                data-type="address"
                data-index={index}
                onChange={handleStopChange}
                className="w-full border rounded-sm bg-background py-1 px-2"
              />
            </div>
            <IconButton
              aria-label="Remove Stop"
              onClick={() => handleDeleteStop(index)}
            >
              <TrashIcon />
            </IconButton>
          </div>
        ))}
        <div className="flex flex-wrap justify-center gap-2 bg-foreground/5 rounded-md p-2">
          <Button
            type="button"
            onClick={handleOpenMap}
            className="flex flex-col gap-1 p-4 w-32 h-fit"
          >
            <MapIcon className="size-8" />
            Add via Map
          </Button>
          <Button
            type="button"
            onClick={handleOpenStop}
            className="flex flex-col gap-1 p-4 w-32 h-fit"
          >
            <BaselineIcon className="size-8" />
            Add Manually
          </Button>
          <Button
            type="button"
            className="flex flex-col gap-1 p-4 w-32 h-fit"
            disabled
          >
            <NotebookPenIcon className="size-8" />
            Add Note
          </Button>
          <Button
            type="button"
            className="flex flex-col gap-1 p-4 w-32 h-fit"
            disabled
          >
            <ImagePlusIcon className="size-8" />
            Add Photos
          </Button>
        </div>
      </div>
      <MapDialog
        isOpen={isMapDialogOpen}
        onClose={handleCloseMap}
        onConfirm={handleAddPlaceConfirm}
      />
      <StopDialog
        isOpen={isStopDialogOpen}
        onClose={handleCloseStop}
        onConfirm={handleAddManuallyConfirm}
      />
    </>
  );
};

export default Stops;
