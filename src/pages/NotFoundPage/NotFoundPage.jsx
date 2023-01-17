import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>요청하신 페이지를 찾을 수 없습니다.</div>
      <Link to="/">메인으로 돌아가기🏠</Link>
    </div>
  );
}

export default NotFoundPage;
