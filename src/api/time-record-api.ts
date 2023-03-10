import { StudyTimeInfo, StudyTimePerSubject } from "types/time-record";
import { instance } from "./axios-config";

export default class TimeRecordApi {
  async getTodayTimeRecord(): Promise<StudyTimeInfo[]> {
    return Promise.resolve([
      {
        startTime: "2019-01-01T11:34:56",
        endTime: "2019-01-01T12:34:56",
        subject: "국어",
      },
      {
        startTime: "2019-01-01T15:34:56",
        endTime: "2019-01-01T16:34:56",
        subject: "수학",
      },
    ]);
    // const response = await instance.get<StudyTimeInfo[]>("/time-record/today");
    // return response.data;
  }

  async getTimeRecordList(date: string) {
    const response = await instance.get<StudyTimeInfo[]>("/time-record", { params: date });
    return response.data;
  }
}

export const saveTime = async (timeInfo: StudyTimePerSubject) => {
  const response = await instance.post("/time-record", timeInfo);
  return response;
};
