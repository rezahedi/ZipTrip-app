import React from "react";
import { Button } from "@/Components/ui/button";
import { XIcon } from "lucide-react";
import IconButton from "@/Components/ui/IconButton";
import Modal from "@/Components/Common/Modal";
import { ListType } from "@/hooks/useListHook";
import { useList } from "@/context/ListContext";

const LIST_COUNT_LIMIT = 5;

const ListEditor = ({
  isOpen,
  onClose,
  placeId,
}: {
  isOpen: boolean;
  onClose: () => void;
  placeId: string | null | undefined;
}) => {
  const {
    list,
    createList,
    removeList,
    addPlaceToList,
    removePlaceFromList,
    saving,
    loading,
  } = useList();

  const handleCreateList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const newList = formData.get("newList") as string;
    if (newList.length == 0) return;

    await createList(newList);
    form.reset();
  };

  const handleRemoveList = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement;
    const listId = btn.dataset.id;
    if (listId) await removeList(listId);
  };

  const handleTogglePlaceInList = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const checkBox = e.target as HTMLInputElement;
    const listId = checkBox.dataset.id;
    if (!listId || !placeId) return;

    // find the index then push placeDetail into [index].places and setList
    if (checkBox.checked) {
      await addPlaceToList(listId, placeId);
    } else {
      await removePlaceFromList(listId, placeId);
    }
  };

  const limitReached = list && list.length >= LIST_COUNT_LIMIT ? true : false;

  if (!placeId) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your List"
      className="px-8 py-12"
    >
      {loading && <p>Loading...</p>}
      {!loading &&
        list &&
        list.map((item: ListType) => (
          <label
            key={item._id}
            className="group flex items-center gap-2 p-2 px-4 rounded-md hover:bg-foreground/5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={item.places.includes(placeId) ? true : false}
              data-id={item._id}
              onChange={handleTogglePlaceInList}
            />
            <span className="grow">{item.name}</span>
            <IconButton
              data-id={item._id}
              onClick={handleRemoveList}
              className="opacity-0 group-hover:opacity-100"
            >
              <XIcon />
            </IconButton>
          </label>
        ))}
      <form
        className="flex gap-2 items-center px-2 mt-6"
        onSubmit={handleCreateList}
      >
        <input
          name="newList"
          type="text"
          placeholder="Create new list ..."
          disabled={limitReached}
          className="grow border rounded-lg bg-background py-2 px-3"
        />
        <Button type="submit" disabled={limitReached}>
          Add
        </Button>
      </form>
      {saving && <p>Saving...</p>}
    </Modal>
  );
};

export default ListEditor;
