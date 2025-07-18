import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';
import SideBar from '../../components/shared/SideBar/SideBar';
import FloatingDateFilterButton from '../../components/shared/FloatingDateFilterButton/FloatingDateFilterButton';

export const MainLayout = () => {
  return (
    <main className={styles.layout}>
      <SideBar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <FloatingDateFilterButton/>
    </main>
  );
};