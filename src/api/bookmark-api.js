import axios from "axios";

export const getBookmark = async () => {
  const response = await axios.get("/bookmark");
  return response;
};

export const saveBookmark = async (roomId) => {
  const response = await axios.post(`/bookmark/${roomId}`);
  return response;
};

export const removeBookmark = async () => {
  const response = await axios.delete("/bookmark");
  return response;
};
