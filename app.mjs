import axios from 'axios';

const API_ENDPOINTS = {
  profile: 'https://pool.braiins.com/accounts/profile/json/btc/',
  workers: 'https://pool.braiins.com/accounts/workers/json/btc/',
};

export default async function handler(req, res) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  switch (req.url) {
    case '/profile':
    case '/workers':
      try {
        const endpoint = API_ENDPOINTS[req.url.slice(1)];
        const response = await axios.get(endpoint, {
          headers: {
            'SlushPool-Auth-Token': apiKey,
          },
        });
        return res.json(response.data);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching data' });
      }
    default:
      return res.status(404).json({ message: 'Not found' });
  }
}