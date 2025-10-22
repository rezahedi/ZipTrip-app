import React, { useState, useEffect, useRef } from "react";
import { PenIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const Editable = function Editable({
  children,
  className = "",
  onSave,
}: {
  children: string;
  className?: string;
  onSave: (name: string) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [editable, setEditable] = useState<"false" | "plaintext-only">("false");
  const editableRef = useRef<HTMLDivElement>(null);

  // Exit edit mode when focus is lost
  const handleBlur = () => {
    if (!editable) return;
    const value = editableRef.current?.textContent || "";
    if (value === children) {
      setMessage("");
      return setEditable("false");
    }

    onSave(value);
    setEditable("false");
    setMessage("Saved!");
    setTimeout(() => setMessage(""), 2000);
  };

  // Edit mode status actions
  useEffect(() => {
    if (editable === "plaintext-only")
      // Focus input if enabled
      editableRef.current?.focus();
  }, [editable]);

  // TODO: Feature: Make editable active on mouse over and disable on mouseout, so when user click cursor pointer goes where user clicked on text.
  // TODO: But make sure it works on mobile too, as we don't have mouse over in mobile, so active edit mode on touch (onClick).
  // Edit mode if clicked
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setEditable("plaintext-only");
    setMessage("Autosave, Hit Enter or Esc to exit.");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (["Enter", "Tab", "Escape"].includes(e.key)) {
      e.preventDefault();
      e.currentTarget.blur();
    }
  };

  return (
    <span className="select-none inline-flex flex-col">
      <div className="flex gap-2 items-center">
        <div
          ref={editableRef}
          onBlur={handleBlur}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          contentEditable={editable}
          title="Click to inline edit"
          className={cn(
            `peer inline-block border border-transparent focus:outline-none focus:border-gray-300 focus:rounded`,
            editable === "false"
              ? `hover:bg-foreground/5 cursor-pointer`
              : `cursor-text`,
            className,
          )}
        >
          {children}
        </div>
        <PenIcon className="invisible shrink-0 peer-hover:visible w-4 text-gray-400" />
      </div>
      {message && <i className="text-xs text-gray-600">{message}</i>}
    </span>
  );
};

export default Editable;
