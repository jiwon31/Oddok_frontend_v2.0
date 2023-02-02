import { instance } from "./axios-config";

export const getPopluarHashtag = async (name) => {
  const query = name ? `?name=${name}` : "";
  const response = await instance.get(`/hashtag/popular${query}`);
  return response;
};
