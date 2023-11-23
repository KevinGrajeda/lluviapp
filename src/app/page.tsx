'use client';
import GraficaHumedad from '@/components/GraficaHumedad';
import GraficaTemperatura from '@/components/GraficaTemperatura';
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
  lluviaAhora: boolean;
  lluviaEnUnaHora: boolean;
};

export default function Home() {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);

  let lluviaMensaje = ""
  if (sensorData.length > 1) {
    const ultimaMedicion = sensorData[sensorData.length - 1];
    if (ultimaMedicion.lluviaAhora) {
      lluviaMensaje = "¡Va a llover en este momento! 🌧"
    } else if (ultimaMedicion.lluviaEnUnaHora) {
      lluviaMensaje = "Va a llover en una hora 🌂"
    } else {
      lluviaMensaje = "No va a llover"
    }
  } else {
    lluviaMensaje = "No se ha podido obtener la información"
  }

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
    fetchSensorData();

    const refreshInterval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <main className=" h-[100svh] p-5 ">
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
          <DialogContent className=" h-96">
            <DialogHeader>
              <DialogTitle>Historial Temperatura</DialogTitle>
              <DialogDescription>
                Ultimas lecturas de temperatura.
              </DialogDescription>
            </DialogHeader>
            <GraficaTemperatura sensorData={sensorData} />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
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
          </DialogTrigger>
          <DialogContent className=" h-[60%]">
            <DialogHeader>
              <DialogTitle>Historial Humedad</DialogTitle>
              <DialogDescription>
                Ultimas lecturas de humedad.
              </DialogDescription>
            </DialogHeader>
            <GraficaHumedad sensorData={sensorData} />
          </DialogContent>
        </Dialog>
      </section>
      <div className="relative mt-5 w-full bg-violet-500 px-5 py-3 rounded-lg shadow-xl shadow-violet-500/30 ">
        {sensorData.length > 1 && sensorData[sensorData.length - 1].lluviaAhora &&
          <span className="absolute right-3 top-3 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
        }
        <h4 className=" mb-3 scroll-m-20 text-xl text-white/70 font-semibold tracking-tight">
          Probabilidad de lluvia
        </h4>
        <p className="scroll-m-20 text-center text-3xl font-extrabold text-white tracking-tight lg:text-5xl">
          {lluviaMensaje}
        </p>
      </div>
    </main>
  );
}
