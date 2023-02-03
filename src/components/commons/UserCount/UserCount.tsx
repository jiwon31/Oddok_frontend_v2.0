import { Plus, Person } from "assets/icons";
import { ReactNode } from "react";
import styles from "./UserCount.module.css";

export default function UserCount({ number }: { number: number }) {
  const users: ReactNode[] = [];
  for (let i = 0; i < number; i += 1) {
    if (i > 5) {
      break;
    }
    if (i <= 4) {
      users.push(<Person className={styles.person} />);
    } else if (i === 5) {
      users.push(<Plus className={styles.plus} />);
    }
  }
  return <div className={styles.count}>{users}</div>;
}
