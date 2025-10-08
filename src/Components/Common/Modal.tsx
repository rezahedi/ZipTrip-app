import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {cn} from "@/lib/utils";

export default function Modal({
  title = "",
  isOpen,
  onClose,
  children,
  className,
}: {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className={cn(
          className,
          `px-3 py-8 w-full h-full sm:max-w-xl max-w-full sm:h-auto rounded-none sm:rounded-lg`
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          )}
        </DialogHeader>
        <div className="flex flex-col gap-2">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
