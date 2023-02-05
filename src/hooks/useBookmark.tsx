import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BookmarkApi from "api/bookmark-api";
import { useSetRecoilState } from "recoil";
import { bookmarkState } from "recoil/bookmark-state";
import { BookmarkType } from "types/bookmark";
import { ErrorType } from "types/error";
import useRecoilUser from "./useRecoilUser";

export default function useBookmark(bookmarkApi = new BookmarkApi()) {
  const { user } = useRecoilUser();
  const setBookmark = useSetRecoilState(bookmarkState);
  const queryClient = useQueryClient();

  const bookmarkQuery = useQuery(["bookmark", user?.id], bookmarkApi.getBookmark, {
    onSuccess: (data) => setBookmark(data),
    staleTime: 1000 * 60,
    enabled: !!user,
  });

  const saveBookmark = useMutation<BookmarkType, ErrorType, string>((roomId) => bookmarkApi.saveBookmark(roomId), {
    onSuccess: (data) => {
      setBookmark(data);
      queryClient.invalidateQueries(["bookmark", user?.id]);
    },
  });

  const removeBookmark = useMutation(bookmarkApi.removeBookmark, {
    onSuccess: () => {
      setBookmark(null);
      queryClient.invalidateQueries(["bookmark", user?.id]);
    },
  });

  return { bookmarkQuery, saveBookmark, removeBookmark };
}
