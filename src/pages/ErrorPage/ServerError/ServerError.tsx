import Layout from "components/layout/Layout";
import styles from "./ServerError.module.css";

export default function ServerError({ onClickRetry }: { onClickRetry: () => void }) {
  return (
    <Layout>
      <div className={styles.container}>
        <h1>서버에 문제가 발생했습니다.</h1>
        <h3 className={styles.message}>잠시 후 다시 시도해주세요.</h3>
        <button className={styles.button} type="button" onClick={onClickRetry}>
          다시 시도하기
        </button>
      </div>
    </Layout>
  );
}
