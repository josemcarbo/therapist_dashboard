import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './TherapistChart.module.css';
import DonutChartSkeleton from '../../components/ui/DonutChartSkeleton/DonutChartSkeleton';
import { pieChartColors } from '../../constants';

type Props = {
  data: any[];
  loading: boolean;
}

const TherapistChart = ({ data, loading }: Props) => {
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

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: chartData.map((d: any) => d.therapist),
        datasets: [
          {
            label: "Duration in minutes",
            data: chartData.map((d: any) => Math.round( d.total_duration_minutes / 60 )),
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

  const transform = (data: any[]): any => {
    const grouped: Record<any, any> = {};
    data.map(d => grouped[d.therapist_name] = (grouped[d.therapist_name] || 0) + d.duration);

    return Object.entries(grouped).map(e => ({
      therapist: e[0],
      total_duration_minutes: e[1]
    }))
  }

  return (
    <div className={styles.container}>
      <h3>Duration per Ally</h3>
      <div className={styles.content}>
        {loading ? (<DonutChartSkeleton />) : (<>
          {
            chartData?.length ? (<canvas ref={chartRef} />) : (<span>No data available</span>)
          }
        </>)}
      </div>
    </div>
  );
};

export default TherapistChart;
