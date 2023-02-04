import { Bookmark } from "types/bookmark";
import { atom } from "recoil";

export const bookmarkState = atom<Bookmark | null>({
  key: "bookmarkState",
  default: null,
});
