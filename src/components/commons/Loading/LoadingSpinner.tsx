import { Spinner } from "assets/icons";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.container}>
      <Spinner className={styles.spinner} />
    </div>
  );
}
