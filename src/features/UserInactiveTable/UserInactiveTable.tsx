import Table from '../../components/ui/Table/Table';
import styles from './UserInactiveTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import type { TableCol } from '../../types/table.type';
import UserInfo from '../../components/ui/UserInfo/UserInfo';
import moment from 'moment';

type Props = {
  loading: boolean
  data: any[]
}

export default function UserInactiveTable({ loading, data }: Props) {
  const cols: TableCol[] = [
    { key: 'user', header: 'user', sortable: true, transform: (row: any) => (<UserInfo content={row.name} label={row.email} />) },
    { key: 'created_at', header: 'Created at', sortable: true, transform: (row: any) => row.created_at ? moment(row.created_at).format('MMM D, h:mm A') : '-' },
    { key: 'last_sign_in_at', header: 'Last Sign in', sortable: true, transform: (row: any) => row.last_sign_in_at ? moment(row.last_sign_in_at).format('MMM D, h:mm A') : '-' },
  ];

  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={5} /> : <Table columns={cols} data={data} />}
    </div>
  );
}