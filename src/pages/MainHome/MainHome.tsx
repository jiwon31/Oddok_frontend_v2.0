import AsyncBoundary from "components/boundary/AsyncBoundary";
import { StudyRoomFeed } from "components/home";
import Banner from "components/home/Banner";
import styles from "./MainHome.module.css";

export default function MainHome() {
  return (
    <main className={styles.main}>
      <AsyncBoundary>
        <Banner />
      </AsyncBoundary>
      <section className={styles.studyroom_list}>
        <h2>STUDY ROOM</h2>
        <StudyRoomFeed />
      </section>
    </main>
  );
}
