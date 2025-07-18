import Table from '../../components/ui/Table/Table';
import styles from './SessionTable.module.css';
import TableSkeleton from '../../components/ui/TableSkeleton/TableSkeleton';
import moment from 'moment';

type Props = {
  data: any[];
  loading: boolean;
};

export default function SessionTable({ data, loading }: Props) {
  const cols = [
    { key: 'email', header: 'User', sortable: true },
    { key: 'therapist_name', header: 'Therapist', sortable: true },
    { key: 'duration', header: 'Duration', sortable: true },
    { key: 'created_at', header: 'Created At', sortable: true },
  ];

  const transformDuration = (minutes: number) => {
    const duration = moment.duration(minutes, 'minutes');

    const years = Math.floor(duration.asYears());
    const months = Math.floor(duration.asMonths() % 12);
    const days = Math.floor(duration.asDays() % 30);
    const hours = duration.hours();
    const mins = duration.minutes();

    let parts = [];

    if (years) parts.push(`${years}y`);
    if (months) parts.push(`${months}mo`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (mins || parts.length === 0) parts.push(`${mins}m`);

    return parts.join(' ');
  }

  const transform = (sessions: any[]) =>
    sessions
      .map((session: any) => ({
        ...session,
        created_at: moment(session.created_at).format('MMM D, h:mm A'),
        duration: transformDuration(session.duration)
      }));

  return (
    <div className={styles.container}>
      {loading ? <TableSkeleton columns={cols.length} rows={10} /> : <Table columns={cols} data={transform(data)} />}
    </div>
  );
}