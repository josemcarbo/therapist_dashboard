import { useEffect, useState } from 'react';
import Table from '../../components/ui/Table/Table';
import styles from './UserTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import { API_URL } from '../../constants';
import moment from 'moment';

type Props = {
  from: Date
  to: Date
}

export default function UserTable({ from, to }: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const cols = [
    { key: 'email', header: 'Email', sortable: true },
    { key: 'last_sign_in_at', header: 'Last Sign in', sortable: true },
    { key: 'session_count', header: 'Sessions', sortable: true }
  ];

  const transform = (users: any[]) =>
    users
      .map((user: any) => ({
        ...user,
        last_sign_in_at: moment(user.last_sign_in_at).format('MMM D, h:mm A')
      }));

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/user-sessions?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}&p_limit=1000`)
      .then(res => res.json().then((res: any) => setData(transform(res))))
      .finally(() => setLoading(false))
  }, [from, to]);

  const formattedDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={10} /> : <Table columns={cols} data={data} />}
    </div>
  );
}