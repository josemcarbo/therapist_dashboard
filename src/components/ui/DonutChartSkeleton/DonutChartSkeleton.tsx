import styles from './DonutChartSkeleton.module.css';

export default function DonutChartSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.legend}>
        <div className={styles.legendItem}></div>
        <div className={styles.legendItem}></div>
        <div className={styles.legendItem}></div>
      </div>
      <div className={styles.chart}>
        <div className={styles.donut}></div>
      </div>
    </div>
  );
}