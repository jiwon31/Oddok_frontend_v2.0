import { DetailedStudyTimeInfo } from "types/time-record";
import TimeTableGrid from "./TimeTableGrid/TimeTableGrid";
import TimeRecordBlock from "./TimeRecordBlock/TimeRecordBlock";

export default function TimeTable({ timeRecordList }: { timeRecordList: DetailedStudyTimeInfo[] }) {
  return (
    <TimeTableGrid>
      <ul>
        {timeRecordList.length > 0 &&
          timeRecordList.map((record, i) => (
            <TimeRecordBlock
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              startTime={new Date(record.startTime)}
              endTime={new Date(record.endTime)}
              color={record.color}
            />
          ))}
      </ul>
    </TimeTableGrid>
  );
}
