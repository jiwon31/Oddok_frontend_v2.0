import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>알 수 없는 에러 발생😵</p>
      <button type="button" onClick={() => window.location.reload()}>
        새로고침
      </button>
    </div>
  );
}

export default ErrorPage;
