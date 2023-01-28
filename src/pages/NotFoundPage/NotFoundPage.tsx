import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h2>요청하신 페이지를 찾을 수 없습니다.</h2>
      <button className={styles.button} type="button" onClick={() => navigate(-1)}>
        이전 화면으로 돌아가기
      </button>
    </div>
  );
}
