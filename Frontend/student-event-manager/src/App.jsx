import React, { useState, useEffect } from 'react';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import { eventAPI } from './services/api';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  // Add new event
  const handleAddEvent = async (eventData) => {
    try {
      setSubmitting(true);
      const response = await eventAPI.createEvent(eventData);
      setEvents([...events, response.data]);
      alert('Event added successfully!');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    try {
      await eventAPI.deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
      alert('Event deleted successfully!');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center">🎓 Student Event Manager</h1>
          <p className="text-center text-blue-100 mt-2">Manage your college fest events</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <EventForm onSubmit={handleAddEvent} loading={submitting} />
          </div>
          <div>
            <EventList
              events={events}
              onDelete={handleDeleteEvent}
              loading={loading}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;