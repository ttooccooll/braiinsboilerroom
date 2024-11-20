import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

app.use(express.json());

const apiEndpoint = 'https://pool.braiins.com/accounts/profile/json/btc/';
const workersEndpoint = 'https://pool.braiins.com/accounts/workers/json/btc/';
const apiKey = process.env.API_KEY;

app.get('/profile', async (req, res) => {
  try {
    const response = await axios.get(apiEndpoint, {
      headers: {
        'SlushPool-Auth-Token': apiKey,
      },
    });
    console.log(response.data);
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
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching workers data' });
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});