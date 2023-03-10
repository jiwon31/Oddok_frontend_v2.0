import { CloseButton, ShareButton } from "components/share";
import { StudyTime } from "components/mypage";
import AsyncBoundary from "components/boundary/AsyncBoundary";
import styles from "./ShareStudyTime.module.css";

export default function ShareStudyTime() {
  return (
    <div className={styles.share_page}>
      <CloseButton />
      <AsyncBoundary>
        <StudyTime />
      </AsyncBoundary>
      <ShareButton />
    </div>
  );
}
