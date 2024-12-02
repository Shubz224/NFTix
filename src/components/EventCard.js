import React from "react";

const EventCard = ({ event, onRegister }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-semibold">{event.name}</h2>
      <p>{event.description}</p>
      <p className="text-sm text-gray-600">Location: {event.location}</p>
      <p className="text-sm text-gray-600">Date: {new Date(event.date * 1000).toLocaleDateString()}</p>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        onClick={() => onRegister(event.id)}
      >
        Register
      </button>
    </div>
  );
};

export default EventCard;
