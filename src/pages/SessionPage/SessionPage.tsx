import styles from './SessionPage.module.css';
import TherapistChart from "../../features/TherapistChart/TherapistChart";
import SessionChart from "../../features/SessionChart/SessionChart";
import SessionTable from "../../features/SessionTable/SessionTable";
import { API_URL } from '../../constants';
import { useUtilStore } from '../../store/utilStore';
import { useEffect, useState } from 'react';

const SessionPage = () => {
  const { from, to, search } = useUtilStore((state) => state._util);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/sessions?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}&p_search=${search}&p_limit=10000`)
      .then(res => res.json().then((res: any) => setData(res)))
      .finally(() => setLoading(false));
  }, [from, to, search]);

  const formattedDate = (date: string) => new Date(date).toISOString();

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <div className={styles.user_table_content}>
          <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>List of sessions ({data.length || 0})</h3>
          <SessionTable data={data} loading={loading} />
        </div>
        <div className={styles.chats_content}>
          <TherapistChart data={data} loading={loading} />
          <SessionChart data={data} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default SessionPage;