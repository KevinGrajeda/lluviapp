'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

type SensorData = {
  temperature: number;
  humidity: number;
};
export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  // Function to fetch sensor data from your API endpoint
  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/sensor');
      if (response.ok) {
        const data: SensorData[] = await response.json();
        setSensorData(data);
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchSensorData();

    // Set up an interval to refresh the data every 5 seconds
    const refreshInterval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <main className=" min-h-[100svh] p-5 ">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl mb-5">
        Sensor de lluvia
      </h1>
      <section className="flex space-x-3 flex-row items-center justify-between w-full">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex-1 bg-rose-500 px-5 py-3 rounded-lg shadow-xl shadow-rose-500/30">
              <h4 className=" mb-3 scroll-m-20 text-center text-xl text-white/70 font-semibold tracking-tight">
                Temperatura
              </h4>
              <p className="scroll-m-20 text-5xl text-center font-extrabold text-white tracking-tight lg:text-5xl">
                {sensorData.length > 1
                  ? sensorData[sensorData.length - 1].temperature
                  : ''}
                °
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Historial Temperatura</DialogTitle>
              <DialogDescription>
                Ultimas 30 lecturas de temperatura.
              </DialogDescription>
            </DialogHeader>
            Hola
          </DialogContent>
        </Dialog>

        <div className="flex-1 bg-teal-500 px-5 py-3 rounded-lg shadow-xl shadow-teal-500/30">
          <h4 className=" mb-3 scroll-m-20 text-xl text-white/70 font-semibold tracking-tight">
            Humedad
          </h4>
          <p className="scroll-m-20 text-center text-5xl font-extrabold text-white tracking-tight lg:text-5xl">
            {sensorData.length > 1
              ? sensorData[sensorData.length - 1].humidity
              : ''}
            %
          </p>
        </div>
      </section>
      <div className="mt-5 w-full bg-violet-500 px-5 py-3 rounded-lg shadow-xl shadow-violet-500/30">
        <h4 className=" mb-3 scroll-m-20 text-xl text-white/70 font-semibold tracking-tight">
          Probabilidad de lluvia
        </h4>
        <p className="scroll-m-20 text-center text-5xl font-extrabold text-white tracking-tight lg:text-5xl">
          10%
        </p>
      </div>
    </main>
  );
}
