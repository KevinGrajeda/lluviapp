import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

type SensorData = {
  temperature: number;
  humidity: number;
};

type GraficaTemperaturaProps = {
  sensorData: SensorData[];
};

const GraficaTemperatura: React.FC<GraficaTemperaturaProps> = ({ sensorData }) => {
  // Crear timestamps para cada dato basado en el índice
  const timestamps = sensorData.map((_, index) => `-${(index) * 5}`).reverse();

  // Extraer temperaturas desde sensorData
  const temperatures = sensorData.map(data => data.temperature);

  // Definir los datos para el gráfico (solo temperatura)
  const chartData = {
    labels: timestamps,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temperatures,
        fill: true,
        borderColor: 'rgba(244, 63, 94, 1)',
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        pointBorderColor: 'rgba(244, 63, 94, 1)',
        pointBackgroundColor: 'rgba(244, 63, 94, 1)',
        pointHoverBackgroundColor: 'rgba(244, 63, 94, 1)',
        pointHoverBorderColor: 'rgba(244, 63, 94, 1)',
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
        min: 10,
        max: 40,
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

export default GraficaTemperatura;
