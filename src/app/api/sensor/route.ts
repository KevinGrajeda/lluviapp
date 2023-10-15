import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'sensorData.json');
const maxDataEntries = 10;

export async function POST(req: Request) {
  const { temperature, humidity } = await req.json();
  console.log(temperature, humidity);
  const newData = { temperature, humidity };

  // Read existing data from the file
  let existingData = [];
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
    existingData = JSON.parse(fileContent);
  } catch (error) {
    // Handle errors if the file doesn't exist or is not valid JSON
  }

  existingData.push(newData);
  if (existingData.length > maxDataEntries) {
    existingData = existingData.slice(existingData.length - maxDataEntries);
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

  return new Response('hola', {
    status: 200,
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
