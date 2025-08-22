const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', eventRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Student Event Manager API is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});