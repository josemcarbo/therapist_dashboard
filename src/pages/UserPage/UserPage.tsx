import styles from './UserPage.module.css';
import UserTable from "../../features/UserTable/UserTable";
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { useUtilStore } from '../../store/utilStore';
import moment from 'moment';
import UserBySessionChart from '../../features/UserBySessionChart/UserBySessionChart';
import InactiveUsersChart from '../../features/InactiveUsersChart/InactiveUsersChart';

const UserPage = () => {
  const { from, to, search } = useUtilStore((state) => state._util);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const transform = (users: any[]) =>
    users
      .map((user: any) => ({
        ...user,
        last_sign_in_at: user.last_sign_in_at ? moment(user.last_sign_in_at).format('MMM D, h:mm A') : '-'
      }));

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/user-sessions?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}&p_limit=1000&p_search=${search}`)
      .then(res => res.json().then((res: any) => setData(transform(res))))
      .finally(() => setLoading(false))
  }, [from, to, search]);

  const formattedDate = (date: string) => new Date(date).toISOString();
  return (
    <div className={styles.container}>
      <div className={styles.user_table_content}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Registered Users ({data.length || 0})</h3>
        <UserTable loading={loading} data={data} />
      </div>
      <div className={styles.chats_content}>
        <UserBySessionChart loading={loading} data={data} />
        <InactiveUsersChart loading={loading} data={data} />
      </div>
    </div>
  );
};

export default UserPage;