import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './SessionChart.module.css';
import ChartBarSkeleton from '../../components/ui/ChartBarSkeleton/ChartBarSkeleton';
import moment from 'moment';
import { pieChartColors } from '../../constants';

type Props = {
  data: any[];
  loading: boolean;
}

const SessionChart = ({ data, loading }: Props) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    setChartData(transform(data));
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      (chartInstance.current as any).destroy();
    }

    const ctx = (chartRef.current as any).getContext("2d");

    const setup = {
      labels: chartData.map((s: any) => s.session_date),
      datasets: [{
        label: 'Sessions per day',
        data: chartData.map((s: any) => s.session_count),
        backgroundColor: pieChartColors[0],
        borderRadius: 6
      }]
    };

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: setup,
      options: {
        responsive: true,
        scales: {
          y: {
            display: false,
          },
          x: {
            display: true,
            ticks: {
              font: {
                size: 10
              },
              maxRotation: 90,
              minRotation: 60
            }
          },
        },
        plugins: {
          legend: {
            display: false
          },
        },
      },
    });
  }, [chartData]);

  const transform = (data: any[]): any => {
    const grouped: Record<any, any> = {};
    data.map(d => grouped[moment(d.created_at).format('YYYY-MM-DD')] = (grouped[moment(d.created_at).format('YYYY-MM-DD')] || 0) + 1);
    return Object.entries(grouped).map(e => ({
      session_count: e[1],
      session_date: e[0]
    }))
  }

  return (
    <div className={styles.container}>
      <h3>Conversation per day</h3>
      <div className={styles.content}>
        {loading ? (<ChartBarSkeleton />) : (<>
          {
            chartData?.length ? (<canvas ref={chartRef} />) : (<span>No data available</span>)
          }
        </>)}
      </div>
    </div>
  );
};

export default SessionChart;