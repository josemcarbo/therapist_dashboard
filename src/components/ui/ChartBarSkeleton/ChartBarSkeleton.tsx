import styles from './ChartBarSkeleton.module.css';
import classNames from 'classnames';

export default function ChartBarSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chart}>
        <div className={classNames(styles.bar, styles.bar_1)}></div>
        <div className={classNames(styles.bar, styles.bar_2)}></div>
        <div className={classNames(styles.bar, styles.bar_3)}></div>
        <div className={classNames(styles.bar, styles.bar_4)}></div>
        <div className={classNames(styles.bar, styles.bar_5)}></div>
        <div className={classNames(styles.bar, styles.bar_6)}></div>
        <div className={classNames(styles.bar, styles.bar_1)}></div>
        <div className={classNames(styles.bar, styles.bar_4)}></div>
        <div className={classNames(styles.bar, styles.bar_2)}></div>
        <div className={classNames(styles.bar, styles.bar_6)}></div>
      </div>
    </div>
  );
}