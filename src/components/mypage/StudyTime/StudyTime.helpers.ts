import { DetailedStudyTimeInfo, StudyTimeInfo } from "types/time-record";
import { getColor } from "utils";

export default function formatTimeRecordData(timeInfo?: StudyTimeInfo[]): {
  totalStudyTime: number;
  timeRecordData: DetailedStudyTimeInfo[];
} {
  let totalStudyTime = 0;
  const timeRecordData = timeInfo
    ? timeInfo.map((data, i) => {
        const diff = +new Date(data.endTime) - +new Date(data.startTime);
        totalStudyTime += diff;
        return {
          ...data,
          color: getColor(i),
          studyTime: new Date(diff).toISOString().slice(11, 19),
        };
      })
    : [];
  return { totalStudyTime, timeRecordData };
}
