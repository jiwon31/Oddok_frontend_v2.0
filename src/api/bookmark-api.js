import { instance } from "./axios-config";

export const getBookmark = async () => {
  const response = await instance.get("/bookmark");
  return response;
};

export const saveBookmark = async (roomId) => {
  const response = await instance.post(`/bookmark/${roomId}`);
  return response;
};

export const removeBookmark = async () => {
  const response = await instance.delete("/bookmark");
  return response;
};
