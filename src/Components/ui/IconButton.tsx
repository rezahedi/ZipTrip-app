import React from "react";
import { Button, type buttonVariants } from "./button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const IB = ({
  children,
  className,
  type = "button",
  variant = "ghost",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) => {
  return (
    <Button
      size="icon"
      type={type}
      variant={variant}
      className={cn(
        "rounded-full h-full size-10 text-ring hover:text-ring hover:bg-foreground/5 active:bg-foreground/20 [&_svg:not([class*='size-'])]:size-6",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default IB;
