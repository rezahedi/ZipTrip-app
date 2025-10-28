import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";

const ListModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    const listString = localStorage.getItem("list") || "[]";
    try {
      const parsedList = JSON.parse(listString);
      setList(parsedList.length > 0 ? parsedList : ["My First List"]);
    } catch {
      setList(["My First List"]);
    }
  }, []);

  useEffect(() => {
    if (list.length == 0) return;

    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const newList = formData.get("newList") as string;
    if (newList.length == 0) return;

    setList((prev) => [...prev, newList]);
    form.reset();
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    const index = Number(btn.dataset.index);
    setList((prev) => prev.filter((v, i) => i !== index));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} modal>
      <DialogContent className="px-3 py-8 w-full h-full sm:max-w-xl max-w-full sm:h-auto rounded-none sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Your List</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 p-4">
          {list &&
            list.map((item: string, i: number) => (
              <label
                key={i}
                className="group flex items-center gap-2 p-4 rounded-md hover:bg-foreground/5 cursor-pointer"
              >
                <input type="checkbox" />
                <span className="grow">{item}</span>
                <IconButton
                  data-index={i}
                  onClick={handleRemove}
                  className="opacity-0 group-hover:opacity-100"
                >
                  <XIcon />
                </IconButton>
              </label>
            ))}
          <form className="p-4" onSubmit={handleSubmit}>
            <input
              name="newList"
              type="text"
              placeholder="Create new list ..."
              disabled={list.length >= 3}
            />
            <Button type="submit" disabled={list.length >= 3}>
              Add
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ListModal;
