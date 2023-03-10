import { StudyTimeInfo, StudyTimePerSubject } from "types/time-record";
import { instance } from "./axios-config";

export default class TimeRecordApi {
  async getTimeRecordByDate(date: string) {
    const response = await instance.get<StudyTimeInfo[]>(`/time-record?date=${date}`);
    return response.data;
  }
}

export const saveTime = async (timeInfo: StudyTimePerSubject) => {
  const response = await instance.post("/time-record", timeInfo);
  return response;
};
