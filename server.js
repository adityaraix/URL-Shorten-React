const express = require('express');
const cors = require('cors');
const shortid = require('shortid');
const connectDB = require('./db');
const Url = require('./models/url.model');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors()); // Allow requests from our React frontend
app.use(express.json()); // Allow us to parse JSON in request bodies

// --- API Routes ---

/**
 * @route   POST /api/shorten
 * @desc    Create a new short URL
 */
app.post('/api/shorten', async (req, res) => {
  const { originalUrl } = req.body;

  // Simple validation for the URL
  if (!originalUrl || !originalUrl.startsWith('http')) {
      return res.status(400).json({ error: 'A valid URL starting with http/https is required.' });
  }

  try {
    // Check if the URL has already been shortened
    let urlDoc = await Url.findOne({ originalUrl });

    if (urlDoc) {
      return res.status(200).json(urlDoc);
    } else {
      const shortCode = shortid.generate();
      
      urlDoc = new Url({
        originalUrl,
        shortCode,
      });

      await urlDoc.save();
      return res.status(201).json(urlDoc);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @route   GET /:shortcode
 * @desc    Redirect to the original URL and track visit
 */
app.get('/:shortCode', async (req, res) => {
  try {
    const urlDoc = await Url.findOne({ shortCode: req.params.shortCode });

    if (urlDoc) {
      // Increment visit count
      urlDoc.visits++;
      await urlDoc.save();
      
      // Redirect to the original URL
      return res.redirect(urlDoc.originalUrl);
    } else {
      return res.status(404).json({ error: 'No URL found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


/**
 * @route   GET /api/stats
 * @desc    (Bonus) Get all shortened URLs with their stats
 */
app.get('/api/stats', async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Start the server
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));