import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './UserBySessionChart.module.css';
import { pieChartColors } from '../../constants';
import PieChartSkeleton from '../../components/ui/PieChartSkeleton/PieChartSkeleton';

type Props = {
  loading: boolean
  data: any[]
}

const UserBySessionChart = ({ loading, data }: Props) => {
  const [chartData, setChartData] = useState<any[]>([]);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    setChartData(data.filter(d => d.session_count).slice(0, 10))
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
        labels: chartData.map((d: any) => d.email.split('@')[0]),
        datasets: [
          {
            label: "Sessions: ",
            data: data.map((d: any) => d.session_count),
            backgroundColor: pieChartColors,
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

  return (
    <div className={styles.container}>
      <h3>Top 10: Sessions per user</h3>
      <div className={styles.content}>
        {loading ? (<PieChartSkeleton />) : (<>
          {
            chartData.length ? (<canvas ref={chartRef} />) : (<span>No data available</span>)
          }
        </>)}
      </div>
    </div>
  );
};

export default UserBySessionChart;