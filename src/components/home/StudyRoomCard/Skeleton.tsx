import styles from "./Skeleton.module.css";

export default function Skeleton() {
  return (
    <li className={styles.item}>
      <div>
        <div className={styles.thumbnail} />
      </div>
      <div>
        <div className={styles.title} />
        <div className={styles.hashtag} />
      </div>
    </li>
  );
}
