import { StudyTimeList, StudyTimePerSubject } from "types/time-record";
import { instance } from "./axios-config";

export default class TimeRecordApi {
  async getTodayTimeRecord() {
    const response = await instance.get<StudyTimeList>("/time-record/today");
    return response.data;
  }

  async getTimeRecordList(date: string) {
    const response = await instance.get<StudyTimeList>("/time-record", { params: date });
    return response.data;
  }
}

export const saveTime = async (timeInfo: StudyTimePerSubject) => {
  const response = await instance.post("/time-record", timeInfo);
  return response;
};
