import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "lucide-react";
import Modal from "@/Components/Common/Modal";
import { ListType } from "@/hooks/useListHook";
import { Place } from "@/types";
import PlaceCard from "./PlaceCard";
import { useList } from "@/context/ListContext";
import PlaceCardSkeleton from "./PlaceCardSkeleton";

// TODO: Consider using HTML5 native accordion

const ListViewer = ({
  onPlaceSelect,
}: {
  onPlaceSelect: (place: Place) => void;
}) => {
  const { list, getList, saving, loading, isOpenViewer, closeViewer } =
    useList();
  const [openedList, setOpenedList] = useState<string>("");

  // Load and open first list by default
  useEffect(() => {
    if (openedList !== "") return;
    if (!list || list.length == 0) return;

    (async () => {
      setOpenedList(list[0]._id);
      await getList(list[0]._id);
    })();
  }, [list]);

  const handleToggleList = async (e: React.MouseEvent<HTMLDivElement>) => {
    const div = e.currentTarget as HTMLDivElement;
    const listId = div.dataset.id as string;

    // If clicked on a open list, close it
    if (openedList !== "" && listId === openedList) return setOpenedList("");

    setOpenedList(listId);
    if (listId) await getList(listId);
  };

  // if (!placeId) return null;

  return (
    <Modal
      isOpen={isOpenViewer}
      onClose={closeViewer}
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
              onClick={handleToggleList}
              tabIndex={0}
            >
              <span className="grow">{item.name}</span>
              <ChevronUpIcon
                className={openedList === item._id ? `rotate-180` : ``}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
              {openedList === item._id && (
                <>
                  {saving && !item.placesDetail && <PlaceCardSkeleton />}
                  {item.placesDetail &&
                    item.placesDetail.map((place: Place) => (
                      <PlaceCard
                        key={place.placeId}
                        place={place}
                        onPlaceSelect={onPlaceSelect}
                      />
                    ))}
                </>
              )}
            </div>
          </div>
        ))}
    </Modal>
  );
};

export default ListViewer;
