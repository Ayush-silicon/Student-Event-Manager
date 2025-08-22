#!/usr/bin/env node

const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper function to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString();
};

// List all events
const listEvents = async () => {
  try {
    const response = await api.get('/events');
    const events = response.data;
    
    if (events.length === 0) {
      console.log('📅 No events found');
      return;
    }
    
    console.log('📅 All Events:');
    console.log('─'.repeat(50));
    
    events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.name}`);
      console.log(`   📅 Date: ${formatDate(event.date)}`);
      console.log(`   📝 Description: ${event.description}`);
      console.log(`   🆔 ID: ${event.id}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Error fetching events:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend server is running on http://localhost:5000');
    }
  }
};

// Add new event
const addEvent = async (name, date, description) => {
  try {
    const response = await api.post('/events', {
      name,
      date,
      description
    });
    
    console.log('✅ Event added successfully!');
    console.log(`📛 Name: ${response.data.name}`);
    console.log(`📅 Date: ${formatDate(response.data.date)}`);
    console.log(`📝 Description: ${response.data.description}`);
    console.log(`🆔 ID: ${response.data.id}`);
  } catch (error) {
    console.error('❌ Error adding event:', error.message);
    if (error.response?.status === 400) {
      console.log('💡 Make sure all fields are provided: name, date, description');
    }
  }
};

// Main CLI logic
const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'list':
      listEvents();
      break;
      
    case 'add':
      if (args.length < 4) {
        console.log('Usage: node cli.js add "Event Name" "YYYY-MM-DD" "Description"');
        console.log('Example: node cli.js add "Tech Fest" "2025-09-01" "Annual technology festival"');
        process.exit(1);
      }
      const [, name, date, description] = args;
      addEvent(name, date, description);
      break;
      
    default:
      console.log('🎓 Student Event Manager CLI');
      console.log('');
      console.log('Available commands:');
      console.log('  list                          - Show all events');
      console.log('  add "name" "date" "desc"     - Add new event');
      console.log('');
      console.log('Examples:');
      console.log('  node cli.js list');
      console.log('  node cli.js add "Tech Fest" "2025-09-01" "Annual tech event"');
  }
};

main();