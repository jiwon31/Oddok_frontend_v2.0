import { BookmarkType } from "types/bookmark";
import { atom } from "recoil";

export const bookmarkState = atom<BookmarkType | null>({
  key: "bookmarkState",
  default: null,
});
