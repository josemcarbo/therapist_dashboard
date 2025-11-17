import styles from './UserInactivePage.module.css';
import { useEffect, useState } from 'react';
import { API_URL } from '../../constants';
import UserInactiveTable from '../../features/UserInactiveTable/UserInactiveTable';
import OptionSelector from '../../components/ui/OptionSelector/OptionSelector';

const DAYS_OPTIONS = [
  { id: '30', label: '30 days' },
  { id: '60', label: '60 days' },
  { id: '120', label: '120 days' }
]

const UserInactivePage = () => {
  const [data, setData] = useState<any[]>([]);
  const [days, setDays] = useState<string>(DAYS_OPTIONS[1].id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/user-inactive?p_days=${days}`)
      .then(res => res.json().then((res: any) => setData(res)))
      .catch(() => setData([]))
      .finally(() => setLoading(false))
  }, [days]);

  const handlerOnChangeDays = (value: any) => {
    setDays(value.id)
  }

  return (
    <div className={styles.container}>
      <div className={styles.user_table_content}>
        <div className={styles.header}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Disable Account Candidates ({data.length || 0})</h3>
          <div>
            <OptionSelector name='days' value={days} options={DAYS_OPTIONS} onChange={handlerOnChangeDays} />
          </div>
        </div>
        <UserInactiveTable loading={loading} data={data} />
      </div>
      {/* <div className={styles.chats_content}>
        <UserBySessionChart loading={loading} data={data} />
        <InactiveUsersChart loading={loading} data={data} />
      </div> */}
    </div>
  );
};

export default UserInactivePage;