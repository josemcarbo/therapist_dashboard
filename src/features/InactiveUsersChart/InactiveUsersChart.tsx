import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './InactiveUsersChart.module.css';
import { pieChartColors } from '../../constants';
import PieChartSkeleton from '../../components/ui/PieChartSkeleton/PieChartSkeleton';
import type { User, UserGroupBySessions } from '../../types/user.type';

type Props = {
  loading: boolean
  data: any[]
}

const InactiveUsersChart = ({ loading, data }: Props) => {
  const [chartData, setChartData] = useState<UserGroupBySessions>();

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    setChartData(transformData(data))
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      (chartInstance.current as any).destroy();
    }

    const ctx = (chartRef.current as any).getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            label: "Users: ",
            data: [chartData?.active || 0, chartData?.inactive || 0],
            backgroundColor: [...pieChartColors].reverse(),
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            display: false,
          },
          x: {
            display: false
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'center',
            labels: {
              font: {
                size: 10
              },
              usePointStyle: true
            }
          },
        },
      },
    });
  }, [chartData]);

  const transformData = (users: User[]): UserGroupBySessions => {
    return users.reduce(
      (acc, user) => {
        if (user.session_count > 0) {
          acc.active += 1;
        } else {
          acc.inactive += 1;
        }
        return acc;
      },
      { active: 0, inactive: 0 }
    );
  }

  return (
    <div className={styles.container}>
      <h3>Active vs Inactive</h3>
      <div className={styles.content}>
        {loading ? (<PieChartSkeleton />) : (<>
          {
            chartData ? (<canvas ref={chartRef} />) : (<span>No data available</span>)
          }
        </>)}
      </div>
    </div>
  );
};

export default InactiveUsersChart;