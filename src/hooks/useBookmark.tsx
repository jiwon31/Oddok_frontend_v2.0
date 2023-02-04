import { useQuery } from "@tanstack/react-query";
import BookmarkApi from "api/bookmark-api";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "recoil/bookmark-state";
import useRecoilUser from "./useRecoilUser";

export default function useBookmark(bookmarkApi = new BookmarkApi()) {
  const { user } = useRecoilUser();
  const setBookmark = useSetRecoilState(bookmarkState);

  const bookmarkQuery = useQuery(["bookmark", user?.id], bookmarkApi.getBookmark, {
    onSuccess: (data) => setBookmark(data),
    staleTime: 1000 * 60,
    enabled: !!user,
  });

  return { bookmarkQuery };
}
