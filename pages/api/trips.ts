import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../../types/Trip';

// your secret hash
const backendUrl = process.env.BACKEND_URL;

type Trips = { trips: Array<Trip> };

export const fetchTrips = async () => {
  const results = await fetch(`${backendUrl}/trips`);
  const jsonBody: Trips = await results.json();
  return jsonBody;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await fetchTrips();

  res.status(200).json(result);
};
