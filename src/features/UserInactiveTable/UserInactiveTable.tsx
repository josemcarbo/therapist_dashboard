import Table from '../../components/ui/Table/Table';
import styles from './UserInactiveTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';

type Props = {
  loading: boolean
  data: any[]
}

export default function UserInactiveTable({ loading, data }: Props) {
  const cols = [
    { key: 'email', header: 'Email', sortable: true },
    { key: 'created_at', header: 'Register at', sortable: true },
    { key: 'last_sign_in_at', header: 'Last Sign in', sortable: true },
  ];

  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={5} /> : <Table columns={cols} data={data} />}
    </div>
  );
}