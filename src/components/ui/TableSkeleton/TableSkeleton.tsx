import styles from './TableSkeleton.module.css';

type Props = {
  columns: number;
  rows: number;
};

export default function TableSkeleton({ columns, rows }: Props) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {[...Array(columns)].map((_, i) => (
              <th key={i}>
                <div className={styles.skeleton} style={{ width: '60%' }}></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIdx) => (
            <tr key={rowIdx}>
              {[...Array(columns)].map((_, colIdx) => (
                <td key={colIdx}>
                  <div className={styles.skeleton}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}