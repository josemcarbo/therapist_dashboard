import { useEffect, useRef, useState } from 'react';
import Chart from "chart.js/auto";
import styles from './SessionChart.module.css';
import ChartBarSkeleton from '../../components/ui/ChartBarSkeleton/ChartBarSkeleton';
import moment from 'moment';
import { API_URL } from '../../constants';
import { useUtilStore } from '../../store/utilStore';

const SessionChart = () => {
  const { from, to } = useUtilStore((state) => state._util);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard/sessions-per-day?p_from=${formattedDate(from)}&p_to=${formattedDate(to)}`)
      .then(res => res.json().then(setData))
      .finally(() => setLoading(false))
  }, [from, to]);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      (chartInstance.current as any).destroy();
    }

    const ctx = (chartRef.current as any).getContext("2d");

    const setup = {
      labels: data.map((s: any) => moment(s.session_date).format('MM/DD')),
      datasets: [{
        label: 'Sessions per day',
        data: data.map((s: any) => s.session_count),
        backgroundColor: '#6B8C82',
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
  }, [data]);

  const formattedDate = (date: string) => new Date(date).toISOString();

  return (
    <div className={styles.container}>
      <h3>Session per day</h3>
      <div className={styles.content}>
        {loading ? (<ChartBarSkeleton />) : (<>
          {
            data.length ? (<canvas ref={chartRef} />) : (<span>No data available</span>)
          }
        </>)}
      </div>
    </div>
  );
};

export default SessionChart;