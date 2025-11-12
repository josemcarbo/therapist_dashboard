import Table from '../../components/ui/Table/Table';
import Image from '../../components/ui/Image/Image';
import styles from './SessionTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import moment from 'moment';
import type { TableCol } from '../../types/table.type';
import { transformDuration } from '../../utils/date';
import UserInfo from '../../components/ui/UserInfo/UserInfo';

type Props = {
  data: any[];
  loading: boolean;
};

const CONVERSATION_TABLE_COLS: TableCol[] = [
  { key: 'name', header: 'User', sortable: true, transform: (row: any) => (<UserInfo content={row.name} label={row.email}/>) },
  { key: 'therapist_avatar', header: 'Therapist', sortable: true, transform: (row: any) => (<Image src={row.therapist_avatar} alt={row.therapist_name} />) },
  { key: 'duration', header: 'Duration', sortable: true, transform: (row: any) => transformDuration(row.duration) },
  { key: 'created_at', header: 'Created At', sortable: true, transform: (row: any) => row.created_at ? moment(row.created_at).format('MMM D, YYYY h:mm A') : '-' },
];

export default function SessionTable({ data, loading }: Props) {
  return (
    <div className={styles.container}>
      {
        loading
          ? <TableSkeleton columns={CONVERSATION_TABLE_COLS.length} rows={10} />
          : <Table columns={CONVERSATION_TABLE_COLS} data={data} />
      }
    </div>
  );
}