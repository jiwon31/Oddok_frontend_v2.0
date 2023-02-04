import { BookmarkType } from "types/bookmark";
import { instance } from "./axios-config";

export default class BookmarkApi {
  async getBookmark() {
    const response = await instance.get<BookmarkType>("/bookmark");
    return response.data;
  }

  async saveBookmark(roomId: string) {
    const response = await instance.post<BookmarkType>(`/bookmark/${roomId}`);
    return response.data;
  }

  async removeBookmark() {
    const response = await instance.delete<void>("/bookmark");
    return response;
  }
}
