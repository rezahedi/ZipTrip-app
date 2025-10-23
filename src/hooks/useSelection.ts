import { selectionType } from "@/Components/Map/types";
import { useState } from "react";

// export type SelectionType = {
//   placeId: string;
//   source: "card" | "marker";
// };
// export type SetSelectionType = Dispatch<SetStateAction<SelectionType | null>>;

export default function useSelection(initial: selectionType | null = null) {
  const [selection, setSelection] = useState<selectionType | null>(initial);

  return { selection, setSelection };
}
