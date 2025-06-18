import { useEffect, useState } from 'react';
import Table from '../../components/ui/Table/Table';
import styles from './SessionTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import { API_URL } from '../../constants';

type Props = {
  from: Date
  to: Date
}

export default function SessionTable({ from, to }: Props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const cols = [
    { key: 'email', header: 'User', sortable: true },
    { key: 'therapist_name', header: 'Therapist', sortable: true },
    { key: 'duration', header: 'Duration', sortable: true },
    { key: 'created_at', header: 'Created At', sortable: true },
  ];

  useEffect(() => {
    console.log({ from, to })
    setLoading(true);
    fetch(`${API_URL}/dashboard/sessions?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}&p_limit=10000`)
      .then(res => res.json().then(setData))
      .finally(() => setLoading(false))
  }, []);

  const formattedDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={10} /> : <Table columns={cols} data={data} />}
    </div>
  );
}