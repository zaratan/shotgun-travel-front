import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../../../../types/Trip';

const backendUrl = process.env.BACKEND_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: { trip: { description?: string; title?: string } } = {
      trip: req.body,
    };
    const tripId = Number(req.query.trip_id);

    const result = await fetch(`${backendUrl}/trips/${tripId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status >= 300) {
      return res.status(500).json({ error: 'nok' });
    }

    const { trip: updatedTrip }: { trip: Trip } = await result.json();

    // ok
    res.status(200).json(updatedTrip);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
