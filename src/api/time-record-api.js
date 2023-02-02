import { instance } from "./axios-config";

export const saveTime = async (timeInfo) => {
  const response = await instance.post("/time-record", timeInfo);
  return response;
};
