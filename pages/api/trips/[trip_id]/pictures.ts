import { NextApiRequest, NextApiResponse } from 'next';
import Picture from '../../../../types/Picture';

// your secret hash
const backendUrl = process.env.BACKEND_URL;

export const fetchPictures = async (tripId: number) => {
  const results = await fetch(`${backendUrl}/trips/${tripId}/pictures`);
  const jsonBody: { pictures: Array<Picture> } = await results.json();
  return jsonBody;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const tripId = Number(req.query.trip_id);
  const result = await fetchPictures(tripId);

  res.status(200).json(result);
};
