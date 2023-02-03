import { instance } from "./axios-config";

export const getTotalParticipant = async () => {
  const response = await instance.get<number>("/participant/count");
  return response.data;
};
