const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for Vercel frontend
app.use(cors({ origin: ['http://localhost:5173', 'leaderboard-frontend-xi-ashen.vercel.app'] }));

// Parse JSON request bodies
app.use(express.json());

// Mount API routes under /api
app.use('/api', apiRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server on Render-assigned port or fallback
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});