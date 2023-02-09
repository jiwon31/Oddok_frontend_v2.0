import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import styles from "./AsyncError.module.css";

type AsyncErrorProps = {
  onClick: () => void;
};

export default function AsyncError({ onClick }: AsyncErrorProps) {
  const { reset } = useQueryErrorResetBoundary();
  const onClickRetry = () => {
    reset();
    onClick();
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>잠시 후 다시 시도해주세요</h2>
      <p className={styles.message}>요청사항을 처리하는데 실패했습니다.</p>
      <button className={styles.button} type="button" onClick={onClickRetry}>
        다시 시도하기
      </button>
    </section>
  );
}
