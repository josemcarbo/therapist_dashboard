import { Outlet } from "react-router-dom";
import Header from "../../components/shared/Header/Header";
// import Footer from "../../components/shared/Footer";
import SideBar from "../../components/shared/SideBar/SideBar";
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
        <div className={styles.main_content}>
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};