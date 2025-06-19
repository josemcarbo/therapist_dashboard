import styles from './DashboardPage.module.css';
import TherapistChart from "../../features/TherapistChart/TherapistChart";
import SessionChart from "../../features/SessionChart/SessionChart";
import UserTable from "../../features/UserTable/UserTable";
import SessionTable from "../../features/SessionTable/SessionTable";
import Tabs from '../../components/ui/Tab/Tab';

const DashboardPage = () => {
  const tabs = [
    {
      key: 'users',
      label: 'Users',
      content: <UserTable />
    },
    {
      key: 'sessions',
      label: 'Sessions',
      content: <SessionTable />
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.content}>
          <Tabs tabs={tabs} />
        </div>
        <div className={styles.col}>
          <div className={styles.content}>
            <SessionChart />
          </div>
          <div className={styles.content}>
            <TherapistChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;