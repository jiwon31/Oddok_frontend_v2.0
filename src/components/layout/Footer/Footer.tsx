import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.info}>
        <div className={styles.title}>
          <h2 className={styles.logo}>ODDOK</h2>
          <p className={styles.name}>실시간 화상 스터디 서비스</p>
        </div>
        <div className={styles.contact}>
          <p className={styles.contents}>Contact</p>
          <p className={styles.content}>yejin013@naver.com</p>
        </div>
        <div className={styles.team}>
          <p className={styles.contents}>Team</p>
          <p className={styles.content}>DOBBY @숭실대학교 소프트웨어학부</p>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>Copyright Dobby 2022, All Rights Reserved.</p>
      </div>
    </footer>
  );
}
export default Footer;
