import styles from './PieChartSkeleton.module.css';

export default function PieChartSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.legend}>
        <div className={styles.legendItem}></div>
        <div className={styles.legendItem}></div>
        <div className={styles.legendItem}></div>
        <div className={styles.legendItem}></div>
      </div>
      <div className={styles.chart}>
        <div className={styles.pie}></div>
      </div>
    </div>
  );
}