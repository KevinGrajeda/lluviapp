import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

type SensorData = {
  temperature: number;
  humidity: number;
  lluviaAhora: boolean;
  lluviaEnUnaHora: boolean;
  timestamp: number;
};


type GraficaTemperaturaProps = {
  sensorData: SensorData[];
};

const GraficaTemperatura: React.FC<GraficaTemperaturaProps> = ({ sensorData }) => {

  // Extraer temperaturas desde sensorData
  const temperatures = sensorData.map(data => data.temperature);

  const timestamps = sensorData.map(data => {
    const date = new Date(data.timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  })

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
        pointRadius: 1,
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
