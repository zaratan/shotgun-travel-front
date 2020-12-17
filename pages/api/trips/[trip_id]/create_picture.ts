import { NextApiRequest, NextApiResponse } from 'next';
import Picture from '../../../../types/Picture';

const backendUrl = process.env.BACKEND_URL;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      description = '',
      title,
      url,
    }: { description: string; title: string; url: string } = req.body;
    const data = {
      picture: { description, title, url },
    };
    const tripId = Number(req.query.trip_id);

    const result = await fetch(`${backendUrl}/trips/${tripId}/pictures`, {
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

    const { picture: newPicture }: { picture: Picture } = await result.json();

    // ok
    res.status(200).json(newPicture);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
