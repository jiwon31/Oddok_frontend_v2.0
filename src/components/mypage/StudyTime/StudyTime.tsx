import { useState } from "react";
import { useLocation } from "react-router-dom";
import { DatePicker, TimeRecordList, TimeTable } from "components/mypage";
import { dateFormatting } from "utils";
import useTimeRecord from "hooks/mypage/useTimeRecord";
import styles from "./StudyTime.module.css";
import formatTimeRecordData from "./StudyTime.helpers";

export default function StudyTime() {
  const { pathname } = useLocation();
  const isSharePage = pathname === "/share/study-time";
  const [selectedDate, setSelectedDate] = useState<string>(dateFormatting(new Date()));

  const {
    timeRecordQuery: { data: timeInfo },
  } = useTimeRecord(selectedDate);
  const { totalStudyTime, timeRecordData } = formatTimeRecordData(timeInfo);

  return (
    <section>
      <h2 className={styles.heading}>공부 기록</h2>
      <div className={styles.container}>
        <div className={`${styles.box} ${isSharePage && styles.share}`}>
          {!isSharePage && (
            <div>
              <div className={styles.sub_heading}>날짜</div>
              <DatePicker onChange={(date: Date) => setSelectedDate(dateFormatting(date))} />
            </div>
          )}
          <div>
            <div className={styles.sub_heading}>과목</div>
            <div className={styles.study_time_box}>
              <div className={styles.total_time}>
                {`${Math.floor(totalStudyTime / 1000 / 60 / 60)}시간 
                  ${Math.floor((totalStudyTime / 1000 / 60) % 60)}분 
                  ${Math.floor(totalStudyTime / 1000) % 60}초`}
              </div>
              {timeRecordData.length > 0 && <TimeRecordList list={timeRecordData} />}
            </div>
          </div>
        </div>
        <div className={`${styles.time_table} ${isSharePage && styles.share}`}>
          <div className={styles.sub_heading}>시간표</div>
          <TimeTable timeRecordList={timeRecordData} />
        </div>
      </div>
    </section>
  );
}
