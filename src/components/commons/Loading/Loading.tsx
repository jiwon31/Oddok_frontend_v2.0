import loading from "assets/loading.gif";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <img className={styles.loading} src={loading} alt="loading" />
    </div>
  );
}
