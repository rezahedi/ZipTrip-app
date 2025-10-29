import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/Components/ui/dialog";
import { cn } from "@/lib/utils";
import { SCROLL_BAR_STYLE } from "@/constants";

export default function Modal({
  title = "",
  description = "",
  isOpen,
  onClose,
  children,
  className,
}: {
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent
        className={cn(
          `px-3 py-8 w-full h-full sm:max-w-xl max-w-full max-h-full sm:h-auto rounded-none sm:rounded-lg flex flex-col`,
          className,
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="text-2xl text-center">{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div
          className={cn(
            "grow flex flex-col gap-2 overflow-y-auto",
            SCROLL_BAR_STYLE,
          )}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
