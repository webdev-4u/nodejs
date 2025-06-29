const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const router = express.Router();

// Root route: serve your custom HTML page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// API route: securely fetch spreadsheet data
router.get('/api/data', async (req, res) => {
  try {
    const accessKey = process.env.API_ACCESS_KEY;
    const secretKey = process.env.API_SECRET_KEY;
    const spreadsheetId = '5Z8Rlg0t07KqFQrp'; // replace with your real ID

    const url = `https://api.apispreadsheet.com/data/${spreadsheetId}?accessKey=${accessKey}&secretKey=${secretKey}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Error fetching data');
  }
});

module.exports = router;
