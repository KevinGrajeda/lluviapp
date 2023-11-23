import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

type SensorData = {
  temperature: number;
  humidity: number;
};

type GraficaHumedadProps = {
  sensorData: SensorData[];
};

const GraficaHumedad: React.FC<GraficaHumedadProps> = ({ sensorData }) => {
  // Crear timestamps para cada dato basado en el índice
  const timestamps = sensorData.map((_, index) => `-${(index) * 5}`).reverse();

  // Extraer temperaturas desde sensorData
  const humedades = sensorData.map(data => data.humidity);


  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Humedad (%)',
        data: humedades,
        fill: true,
        borderColor: 'rgba(20, 184, 166, 1)',
        backgroundColor: 'rgba(20, 184, 166, 0.2)',
        pointBorderColor: 'rgba(20, 184, 166, 1)',
        pointBackgroundColor: 'rgba(20, 184, 166, 1)',
        pointHoverBackgroundColor: 'rgba(20, 184, 166, 1)',
        pointHoverBorderColor: 'rgba(20, 184, 166, 1)',
        pointRadius: 5,
        pointHoverRadius: 8,

      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'black',
        },
      },
    }, elements: {
      point: {
        hitRadius: 20,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default GraficaHumedad;
