import { Header, Footer } from "@components/home";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.inner}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
