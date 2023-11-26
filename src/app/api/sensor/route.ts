import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'sensorData.json');
const maxDataEntries = 30;

//post request to save data and read the response


export async function POST(req: Request) {
  const { temperature, humidity } = await req.json();
  const { lluviaAhora, lluviaEnUnaHora } = await predecir(temperature, humidity);

  console.log(temperature, humidity, lluviaAhora, lluviaEnUnaHora);
  const newData = { temperature, humidity, lluviaAhora, lluviaEnUnaHora, timestamp: Date.now() };

  let existingData = [];
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch (error) {
  }

  existingData.push(newData);
  if (existingData.length > maxDataEntries) {
    existingData = existingData.slice(existingData.length - maxDataEntries);
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));



  return new Response(JSON.stringify({ lluviaAhora, lluviaEnUnaHora }), {
    status: 200,
  });
}

function predecir(temperature: number, humidity: number): Promise<{ lluviaAhora: boolean, lluviaEnUnaHora: boolean }> {
  return new Promise((resolve, reject) => {
    exec(`python3 predecir.py ${temperature} ${humidity}`, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        const resultado = stdout.trim().split(',');
        const lluviaAhora = resultado[0] === 'True';
        const lluviaEnUnaHora = resultado[1] === 'True';
        resolve({ lluviaAhora, lluviaEnUnaHora });
      }
    });
  });
}
export async function GET() {
  let sensorData = [];
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    sensorData = JSON.parse(fileContent);
  } catch (error) {
    // Handle errors if the file doesn't exist or is not valid JSON
  }
  return Response.json(sensorData);
}
