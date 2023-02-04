import { instance } from "./axios-config";

export default class BookmarkApi {
  async getBookmark() {
    const response = await instance.get("/bookmark");
    return response.data;
  }

  async saveBookmark(roomId: string) {
    const response = await instance.post(`/bookmark/${roomId}`);
    return response.data;
  }

  async removeBookmark() {
    const response = await instance.delete("/bookmark");
    return response;
  }
}
