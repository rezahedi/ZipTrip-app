import React, {useState, useEffect, useRef, memo} from "react";
import {PenIcon} from "lucide-react";

const Editable = function Editable({
  children,
  onSave,
}: {
  children: string;
  onSave: (name: string) => void;
}) {
  const [message, setMessage] = useState<string>("");
  const [editable, setEditable] = useState<"false" | "plaintext-only">("false");
  const [text, setText] = useState(children);
  const editableRef = useRef<HTMLDivElement>(null);

  // Exit edit mode when focus is lost
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!editable) return;

    setEditable("false");
    setMessage("");
  };

  // Call save action when text changes
  useEffect(() => {
    (async () => {
      if (text === children) return;

      onSave(text);
      setMessage("Saved!");
      setTimeout(() => setMessage(""), 2000);
    })();
  }, [text]);

  // Edit mode status actions
  useEffect(() => {
    if (editable === "plaintext-only")
      // Focus input if enabled
      editableRef.current?.focus();
    else {
      // Set text state if disabled
      let newText = editableRef.current!.textContent || "";
      newText = newText.trim();

      setText(newText);
    }
  }, [editable]);

  // Edit mode if clicked
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setEditable("plaintext-only");
    setMessage("Autosave, Hit Enter or Esc to exit.");
    e.currentTarget.focus();
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
          className={`peer inline-block border border-transparent focus:outline-none focus:border-gray-300 focus:rounded ${editable === "false" ? `cursor-pointer` : `cursor-text`}`}
        >
          {text}
        </div>
        <PenIcon className="hidden peer-hover:inline w-4 text-gray-400" />
      </div>
      {message && <i className="text-xs text-gray-600">{message}</i>}
    </span>
  );
};

export default Editable;
