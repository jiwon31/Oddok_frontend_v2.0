import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import styles from "./Layout.module.css";

function Layout({ children }: { children?: JSX.Element }) {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.inner}>{!children ? <Outlet /> : children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
