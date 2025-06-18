import { Outlet } from 'react-router-dom';
import Header from '../../components/shared/Header/Header';
import styles from './MainLayout.module.css';

export const MainLayout = () => {
  return (
    <main className={styles.layout}>
      <Header/>
      <div className={styles.container}>
        <Outlet />
      </div>
    </main>
  );
};