import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">Loading events...</div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600 text-lg">No events found</div>
        <p className="text-gray-500 mt-2">Add your first event to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Events ({events.length})
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;