import { instance } from "./axios-config";

export const getTotalParticipant = async () => {
  const response = await instance.get("/participant/count");
  return response;
};
