import { NextApiRequest, NextApiResponse } from 'next';
import Trip from '../../types/Trip';

const backendUrl = process.env.BACKEND_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      description = '',
      title,
    }: { description: string; title: string } = req.body;
    const data = {
      trip: { description, title },
    };

    const result = await fetch(`${backendUrl}/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (result.status >= 300) {
      return res.status(500).json({ error: 'nok' });
    }

    const { trip: newTrip }: { trip: Trip } = await result.json();

    // ok
    res.status(200).json(newTrip);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
