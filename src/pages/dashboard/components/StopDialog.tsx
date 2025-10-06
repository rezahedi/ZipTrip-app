import React, { useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { PassingStop } from "@/util/dashboard";

const StopDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (stop: PassingStop) => void;
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    onConfirm({
      name: nameRef.current!.value || "",
      imageURL: imageRef.current!.value || "",
      address: addressRef.current!.value || "",
      location: [Number(latRef.current!.value), Number(lngRef.current!.value)],
      description: "",
      sequence: 0,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="px-3 py-8 w-full h-full sm:max-w-xl max-w-full sm:h-auto rounded-none sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Type in Your Place Manually</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            ref={nameRef}
            required
            placeholder="Enter the name *"
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            ref={imageRef}
            required
            placeholder="Enter the image URL *"
            className="w-full border rounded-md p-2"
          />
          <input
            type="text"
            ref={addressRef}
            required
            placeholder="Enter the address *"
            className="w-full border rounded-md p-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              ref={latRef}
              placeholder="Enter the latitude"
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              ref={lngRef}
              placeholder="Enter the longitude"
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleAdd}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StopDialog;
