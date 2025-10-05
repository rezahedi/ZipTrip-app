import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import {
  CopyIcon,
  MessageCircleIcon as TextIcon,
  MailIcon,
  Share2Icon,
} from "lucide-react";

const canShare = window.navigator.canShare({ title: "", url: "" }) || false;

const ShareDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async () => {
    if (canShare) {
      try {
        await navigator.share({
          title: window.document.title,
          url: window.location.href,
        });
        onClose();
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.warn("Share not supported");
    }
  };

  const handleCopyLink = async () => {
    try {
      await window.navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(window.document.title);
    const body = encodeURIComponent(
      `Check out this link: ${window.location.href}`,
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="px-3 py-8 w-full h-full sm:max-w-xl max-w-full sm:h-auto rounded-none sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Share</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <ul className="divide-y space-y-4 [&_button]:flex [&_button]:gap-3 [&_button]:items-center [&_button]:text-xl [&_button]:text-foreground [&_li]:pb-4">
            <li>
              <Button variant="link" onClick={handleCopyLink}>
                <CopyIcon className="size-6 text-foreground/40" /> Copy link
                {isCopied && <i className="text-base text-accent">Copied!</i>}
              </Button>
            </li>
            <li>
              <Button variant="link" disabled>
                <TextIcon className="size-6 text-foreground/40" /> Text
              </Button>
            </li>
            <li>
              <Button variant="link" onClick={handleEmail}>
                <MailIcon className="size-6 text-foreground/40" /> Email
              </Button>
            </li>
            {canShare && (
              <li>
                <Button variant="link" onClick={handleShare}>
                  <Share2Icon className="size-6 text-foreground/40" /> Share
                </Button>
              </li>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
