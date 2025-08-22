const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const router = express.Router();

const EVENTS_FILE = path.join(__dirname, '../events.json');

// Initialize events file if it doesn't exist
const initializeEventsFile = async () => {
  try {
    await fs.access(EVENTS_FILE);
  } catch (error) {
    await fs.writeJson(EVENTS_FILE, []);
  }
};

// Helper function to read events
const readEvents = async () => {
  await initializeEventsFile();
  return await fs.readJson(EVENTS_FILE);
};

// Helper function to write events
const writeEvents = async (events) => {
  await fs.writeJson(EVENTS_FILE, events, { spaces: 2 });
};

// GET /api/events - Fetch all events
router.get('/events', async (req, res) => {
  try {
    const events = await readEvents();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// GET /api/events/:id - Fetch event by ID
router.get('/events/:id', async (req, res) => {
  try {
    const events = await readEvents();
    const event = events.find(e => e.id === req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// POST /api/events - Create new event
router.post('/events', async (req, res) => {
  try {
    const { name, date, description } = req.body;
    
    if (!name || !date || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const events = await readEvents();
    const newEvent = {
      id: Date.now().toString(),
      
      
      createdAt: new Date().toISOString()
    };
    
    events.push(newEvent);
    await writeEvents(events);
    
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// DELETE /api/events/:id - Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const events = await readEvents();
    const eventIndex = events.findIndex(e => e.id === req.params.id);
    
    if (eventIndex === -1) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    events.splice(eventIndex, 1);
    await writeEvents(events);
    
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

module.exports = router;