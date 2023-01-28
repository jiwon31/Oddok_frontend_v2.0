import axios from "axios";

export const saveTime = async (timeInfo) => {
  const response = await axios.post("/time-record", timeInfo);
  return response;
};
