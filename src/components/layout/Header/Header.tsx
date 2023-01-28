import { Link, useLocation } from "react-router-dom";
import { Search } from "assets/icons";
// import UserInfo from "../UserInfo/UserInfo";
import styles from "./Header.module.css";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        ODDOK
      </Link>
      <div className={styles.pages}>
        <Link to="/" className={`${styles.page} ${pathname === "/" && styles.clicked}`}>
          스터디룸
        </Link>
        <Link to="/mypage" className={`${styles.page} ${pathname === "/mypage" && styles.clicked}`}>
          마이페이지
        </Link>
      </div>
      <nav className={styles.nav}>
        <Link to="/search" className={styles.search}>
          <Search />
        </Link>
        {/* <UserInfo /> */}
        <Link to="/studyroom/create" className={styles.button}>
          + 새 스터디 만들기
        </Link>
      </nav>
    </header>
  );
}
export default Header;
