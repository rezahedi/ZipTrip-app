import {Dispatch, SetStateAction} from "react";
import {Plan, Place} from "@/types";

type itemType = Plan | Place;

type itemsType = Plan[] | Place[];

type selectionType = {
  item: itemType;
  source: "card" | "marker";
};

type setSelectionType = Dispatch<SetStateAction<selectionType | null>>;

export {itemType, itemsType, selectionType, setSelectionType};
