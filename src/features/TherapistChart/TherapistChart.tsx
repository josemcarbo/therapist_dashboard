import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './TherapistChart.module.css';
import DonutChartSkeleton from '../../components/ui/DonutChartSkeleton/DonutChartSkeleton';
import { API_URL } from '../../constants';

type Props = {
  from: Date
  to: Date
}

const TherapistChart = ({ from, to }: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/duration-by-therapist?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}`)
      .then(res => res.json().then(setData))
      .finally(() => setLoading(false))
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      (chartInstance.current as any).destroy();
    }

    const ctx = (chartRef.current as any).getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((d: any) => d.therapist),
        datasets: [
          {
            label: "Duration in minutes",
            data: data.map((d: any) => d.total_duration_minutes),
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
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
  }, [data]);

  const formattedDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      <h3>Session duration by Therapist</h3>
      <div className={styles.content}>
        {loading ? (<DonutChartSkeleton />) : (<canvas ref={chartRef} />)}
      </div>
    </div>
  );
};

export default TherapistChart;