import axios from 'axios';

export default async function handler(req, res) {
  if (req.url === '/profile') {
    try {
      const response = await axios.get('https://pool.braiins.com/accounts/profile/json/btc/', {
        headers: {
          'SlushPool-Auth-Token': process.env.API_KEY,
        },
      });
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching profile data' });
    }
  } else if (req.url === '/workers') {
    try {
      const response = await axios.get('https://pool.braiins.com/accounts/workers/json/btc/', {
        headers: {
          'SlushPool-Auth-Token': process.env.API_KEY,
        },
      });
      return res.json(response.data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error fetching workers data' });
    }
  } else {
    return res.status(404).json({ message: 'Not found' });
  }
}