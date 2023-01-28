import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>알 수 없는 에러가 발생하였습니다.</h2>
      <button className={styles.button} type="button" onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}

export default ErrorPage;
