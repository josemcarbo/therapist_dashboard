import styles from './DashboardPage.module.css';
import TherapistChart from "../../features/TherapistChart/TherapistChart";
import SessionChart from "../../features/SessionChart/SessionChart";
import UserTable from "../../features/UserTable/UserTable";
import SessionTable from "../../features/SessionTable/SessionTable";
import { useUtilStore } from "../../store/utilStore";
import Tabs from '../../components/ui/Tab/Tab';

const DashboardPage = () => {
  // const { formik, handleSignInWithGoogle } = useLoginPage();
  const { from, to } = useUtilStore((state) => state._util);
  const tabs = [
    {
      key: 'users',
      label: 'Users',
      content: <UserTable from={new Date(from)} to={new Date(to)} />
    },
    {
      key: 'sessions',
      label: 'Sessions',
      content: <SessionTable from={new Date(from)} to={new Date(to)} />
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
            <SessionChart from={new Date(from)} to={new Date(to)} />
          </div>
          <div className={styles.content}>
            <TherapistChart from={new Date(from)} to={new Date(to)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;