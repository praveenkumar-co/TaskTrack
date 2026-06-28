import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import connectDB from './db/db.js';
import app from './app.js';

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Task Tracker API is active and listening`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  });
