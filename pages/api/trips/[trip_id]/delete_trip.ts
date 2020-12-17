import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../../../../types/Trip';

const backendUrl = process.env.BACKEND_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tripId = Number(req.query.trip_id);

    const result = await fetch(`${backendUrl}/trips/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (result.status >= 300) {
      return res.status(500).json({ error: 'nok' });
    }

    // ok
    res.status(200).json({ result: 'ok' });
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
