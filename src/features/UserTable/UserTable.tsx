import Table from '../../components/ui/Table/Table';
import styles from './UserTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import type { TableCol } from '../../types/table.type';

type Props = {
  loading: boolean
  data: any[],
  cols: TableCol[]
}

export default function UserTable({ loading, data, cols }: Props) {
  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={5} /> : <Table columns={cols} data={data} />}
    </div>
  );
}