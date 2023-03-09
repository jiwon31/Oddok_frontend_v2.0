import { useLocation } from "react-router-dom";
import { DatePicker } from "components/mypage";
import { dateFormatting } from "utils";
import useTimeRecord from "hooks/mypage/useTimeRecord";
import styles from "./StudyTime.module.css";

export default function StudyTime() {
  const { pathname } = useLocation();
  const isSharePage = pathname === "/share/study-time";
  // const [selectedDate, setSelectedDate] = useState<string>(dateFormatting(new Date()));
  // const [timeRecordData, setTimeRecordData] = useState();
  // const [totalStudyTime, setTotalStudyTime] = useState(100);
  const {
    timeRecordQuery: { data: timeRecord },
  } = useTimeRecord();

  console.log(timeRecord);

  // const fetchTimeRecordData = async (date: string) => {
  //   const response = await getTimeRecordList(date);
  //   let total = 0;
  //   const array =
  //     response &&
  //     response.map((data, i) => {
  //       const diff = new Date(data.endTime) - new Date(data.startTime);
  //       total += diff;
  //       return {
  //         ...data,
  //         startTime: new Date(data.startTime),
  //         endTime: new Date(data.endTime),
  //         color: getColor(i),
  //         studyTime: new Date(diff).toISOString().slice(11, 19),
  //       };
  //     });
  //   setTimeRecordData(array);
  //   setTotalStudyTime(total);
  // };

  // useEffect(() => {
  //   try {
  //     fetchTimeRecordData(selectedDate);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [selectedDate]);

  return (
    <section>
      <h2 className={styles.heading}>공부 기록</h2>
      <div className={styles.container}>
        <div className={`${styles.box} ${isSharePage && styles.share}`}>
          {!isSharePage && (
            <div>
              <div className={styles.sub_heading}>날짜</div>
              <DatePicker onChange={(date: Date) => dateFormatting(date)} />
            </div>
          )}
          <div>
            <div className={styles.sub_heading}>과목</div>
            <div className={styles.study_time_box}>
              <div className={styles.total_time}>
                {`${Math.floor(90 / 1000 / 60 / 60)}시간 
                  ${Math.floor((90 / 1000 / 60) % 60)}분 
                  ${Math.floor(90 / 1000) % 60}초`}
              </div>
              {/* <TimeRecordList list={timeRecordData} /> */}
            </div>
          </div>
        </div>
        <div className={`${styles.time_table} ${isSharePage && styles.share}`}>
          <div className={styles.sub_heading}>시간표</div>
          {/* <TimeTable timeRecordList={timeRecordData} /> */}
        </div>
      </div>
    </section>
  );
}
