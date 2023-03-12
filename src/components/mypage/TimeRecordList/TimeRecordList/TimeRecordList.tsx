import { DetailedStudyTimeInfo } from "types/time-record";
import TimeRecordItem from "../TimeRecordItem/TimeRecordItem";
import styles from "./TimeRecordList.module.css";

export default function TimeRecordList({ list }: { list: DetailedStudyTimeInfo[] }) {
  return (
    <div className={styles.wrapper}>
      {list.map((item, i) => (
        <TimeRecordItem
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          color={item.color}
          title={item.subject}
          studyTime={item.studyTime}
        />
      ))}
    </div>
  );
}
