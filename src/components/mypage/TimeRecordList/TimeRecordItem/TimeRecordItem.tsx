import styles from "./TimeRecordItem.module.css";

type TimeRecordItemProps = {
  color: string;
  title: string;
  studyTime: string;
};

export default function TimeRecordItem({ color, title, studyTime }: TimeRecordItemProps) {
  return (
    <li className={styles.item}>
      <div className={styles.title}>
        <div className={styles.color} style={{ backgroundColor: `${color}` }} />
        <span>{title}</span>
      </div>
      <span>{studyTime}</span>
    </li>
  );
}
