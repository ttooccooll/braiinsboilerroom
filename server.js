const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

const apiEndpoint = 'https://pool.braiins.com/accounts/profile/json/btc/';
const workersEndpoint = 'https://pool.braiins.com/accounts/workers/json/btc/';
const apiKey = 'bX4OY4T23OVflwyS';

app.get('/profile', async (req, res) => {
  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        'SlushPool-Auth-Token': apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching profile data' });
  }
});

app.get('/workers', async (req, res) => {
  try {
    const response = await axios.get(workersEndpoint, {
      headers: {
        'SlushPool-Auth-Token': apiKey,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching workers data' });
  }
});

app.use(express.static(__dirname));

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});