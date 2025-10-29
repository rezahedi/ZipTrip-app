import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";
import Modal from "@/Components/Common/Modal";
import useListHook, { ListType } from "@/hooks/useListHook";
import { Place } from "@/types";
import PlaceCard from "./PlaceCard";

const ListViewer = ({
  isOpen,
  onClose,
  onPlaceSelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPlaceSelect: (place: Place) => void;
}) => {
  const { list, getList, saving, loading } = useListHook();
  const [openedList, setOpenedList] = useState<string>("");

  useEffect(() => {
    if (!list || list.length == 0) return;

    setOpenedList(list[0]._id);
    getList(list[0]._id);
  }, []);

  const handleOpenList = async (e: React.MouseEvent<HTMLDivElement>) => {
    const div = e.currentTarget as HTMLDivElement;
    const listId = div.dataset.id as string;
    setOpenedList(listId);
    if (listId) await getList(listId);
  };

  // if (!placeId) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your List"
      description="Click on saved places to add it to your itinerary"
      className="px-8 py-12"
    >
      {loading && <p>Loading...</p>}
      {!loading &&
        list &&
        list.map((item: ListType) => (
          <div key={item._id}>
            <div
              className="group flex items-center gap-2 p-2 px-4 rounded-md hover:bg-foreground/5 cursor-pointer"
              role="button"
              data-id={item._id}
              onClick={handleOpenList}
              tabIndex={0}
            >
              <span className="grow">{item.name}</span>
              <ChevronUpIcon
                className={openedList === item._id ? `rotate-180` : ``}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {openedList === item._id &&
                item.placesDetail &&
                item.placesDetail.map((place: Place) => (
                  <PlaceCard
                    key={place.placeId}
                    place={place}
                    onPlaceSelect={onPlaceSelect}
                  />
                ))}
            </div>
          </div>
        ))}
      {saving && <p>Saving...</p>}
    </Modal>
  );
};

export default ListViewer;
