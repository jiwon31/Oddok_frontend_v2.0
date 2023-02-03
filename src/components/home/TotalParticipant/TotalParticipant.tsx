import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserCount } from "components/commons";
import { getTotalParticipant } from "api/participant-api";
import styles from "./TotalParticipant.module.css";

export default function TotalParticipant() {
  const { data: totalParticipant } = useQuery(["participants"], getTotalParticipant, {
    initialData: 0,
    staleTime: 1000 * 60,
  });

  return (
    <section className={styles.participant}>
      {totalParticipant > 0 && (
        <div className={styles.count_icon}>
          <UserCount number={totalParticipant} />
        </div>
      )}
      <div className={styles.count_box}>
        <p className={styles.text}>{totalParticipant}명이 ODDOK에서 공부 중이에요</p>
        <Link to="/studyroom/create" className={styles.button}>
          ODDOK과 함께 스터디 시작하기
        </Link>
      </div>
    </section>
  );
}
