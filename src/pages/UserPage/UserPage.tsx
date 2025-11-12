import styles from './UserPage.module.css';
import UserTable from "../../features/UserTable/UserTable";
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import { useUtilStore } from '../../store/utilStore';
import moment from 'moment';
import UserBySessionChart from '../../features/UserBySessionChart/UserBySessionChart';
import InactiveUsersChart from '../../features/InactiveUsersChart/InactiveUsersChart';
import type { TableCol } from '../../types/table.type';
import UserInfo from '../../components/ui/UserInfo/UserInfo';

const USER_TABLE_COLS: TableCol[] = [
  { key: 'name', header: 'User', sortable: true, transform: (row: any) => (<UserInfo content={row.name} label={row.email} />) },
  { key: 'created_at', header: 'Created At', sortable: true, transform: (row: any) => row.created_at ? moment(row.created_at).format('MMM D, YYYY h:mm A') : '-' },
  { key: 'last_sign_in_at', header: 'Last Sign in', sortable: true, transform: (row: any) => row.last_sign_in_at ? moment(row.last_sign_in_at).format('MMM D, YYYY h:mm A') : '-' },
  { key: 'session_count', header: 'Conversations', sortable: true }
];

const UserPage = () => {
  const { from, to, search } = useUtilStore((state) => state._util);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/user-sessions?p_from=${from}&p_to=${to}&p_search=${search}`)
      .then(res => res.json().then((res: any) => setData(res)))
      .finally(() => setLoading(false))
  }, [from, to, search]);

  return (
    <div className={styles.container}>
      <div className={styles.user_table_content}>
        <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Registered Users ({data.length || 0})</h3>
        <UserTable loading={loading} data={data} cols={USER_TABLE_COLS} />
      </div>
      <div className={styles.chats_content}>
        <UserBySessionChart loading={loading} data={data} />
        <InactiveUsersChart loading={loading} data={data} />
      </div>
    </div>
  );
};

export default UserPage;