import React, { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import Modal from "@/Components/Common/Modal";
import { Place } from "@/types";
import { usePlans } from "../PlansContext";

type ListType = { name: string; places: Place[] };
const DEFAULT_LIST = [{ name: "My First List", places: [] }];

const ListModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [list, setList] = useState<ListType[]>([]);
  const { placeDetail } = usePlans();
  const place = placeDetail?.place as Place;

  useEffect(() => {
    const listString = localStorage.getItem("list") || "[]";
    try {
      const parsedList = JSON.parse(listString);
      setList(parsedList.length > 0 ? parsedList : DEFAULT_LIST);
    } catch {
      setList(DEFAULT_LIST);
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

    setList((prev) => [...prev, { name: newList, places: [] }]);
    form.reset();
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    const index = Number(btn.dataset.index);
    setList((prev) => prev.filter((v, i) => i !== index));
  };

  const handleListSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkBox = e.target as HTMLInputElement;
    const index = Number(checkBox.dataset.index);

    if (!place) {
      return (checkBox.checked = false);
    }

    // find the index then push placeDetail into [index].places and setList
    if (checkBox.checked) {
      setList((prev) =>
        prev.map((item: ListType, i: number) => ({
          ...item,
          places: i === index ? [...item.places, place] : item.places,
        })),
      );
    } else {
      setList((prev) =>
        prev.map((item: ListType, i: number) => ({
          ...item,
          places:
            i === index
              ? item.places.filter((p) => p.placeId !== place.placeId)
              : item.places,
        })),
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your List"
      className="px-8 py-12"
    >
      {list &&
        list.map((item: ListType, i: number) => (
          <label
            key={i}
            className="group flex items-center gap-2 p-2 px-4 rounded-md hover:bg-foreground/5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={
                place
                  ? item.places.find((p) => p.placeId === place.placeId)
                    ? true
                    : false
                  : false
              }
              data-index={i}
              onChange={handleListSwitch}
            />
            <span className="grow">{item.name}</span>
            <IconButton
              data-index={i}
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100"
            >
              <XIcon />
            </IconButton>
          </label>
        ))}
      <form
        className="flex gap-2 items-center px-2 mt-6"
        onSubmit={handleSubmit}
      >
        <input
          name="newList"
          type="text"
          placeholder="Create new list ..."
          disabled={list.length >= 3}
          className="grow border rounded-lg bg-background py-2 px-3"
        />
        <Button type="submit" disabled={list.length >= 3}>
          Add
        </Button>
      </form>
    </Modal>
  );
};

export default ListModal;
