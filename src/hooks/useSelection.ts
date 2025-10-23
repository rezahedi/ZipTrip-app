import { Dispatch, SetStateAction, useState } from "react";

export type SelectionType = {
  placeId: string;
  location?: [number, number];
  source: "card" | "marker";
};
export type SetSelectionType = Dispatch<SetStateAction<SelectionType | null>>;

export default function useSelection(initial: SelectionType | null = null) {
  const [selection, setSelection] = useState<SelectionType | null>(initial);

  return { selection, setSelection };
}
