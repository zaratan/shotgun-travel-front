import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../../../types/Trip';

// your secret hash
const backendUrl = process.env.BACKEND_URL;

export const fetchTrip = async (tripId: number) => {
  const results = await fetch(`${backendUrl}/trips/${tripId}`);
  const jsonBody: { trip: Trip } = await results.json();
  return jsonBody;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tripId = Number(req.query.trip_id);
  const result = await fetchTrip(tripId);

  res.status(200).json(result);
};
