import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import EventCard from "../Components/EventCard";

const Home = () => {
  const { contract } = useContext(Web3Context);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventIds = await contract.getEventIds();
      const eventDetails = await Promise.all(eventIds.map((id) => contract.events(id)));
      setEvents(eventDetails);
    };
    fetchEvents();
  }, [contract]);

  const handleRegister = (eventId) => {
    console.log("Register for Event ID:", eventId);
    // Add registration logic here
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} onRegister={handleRegister} />
        ))}
      </div>
    </div>
  );
};

export default Home;
