// contractHelpers.js
export const createEvent = async (contract, name, description, location, date) => {
    try {
      const transaction = await contract.createEvent(name, description, location, date);
      await transaction.wait();
      console.log("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };
  
  export const claimAttendance = async (contract, eventId, tokenURI) => {
    try {
      const transaction = await contract.claimAttendance(eventId, tokenURI);
      await transaction.wait();
      console.log("NFT claimed successfully!");
    } catch (error) {
      console.error("Error claiming attendance:", error);
    }
  };
  
  export const getEvents = async (contract) => {
    try {
      const eventCount = await contract._eventIdCounter();
      const events = [];
  
      for (let i = 1; i <= eventCount; i++) {
        const event = await contract.events(i);
        events.push({
          id: i,
          name: event.name,
          description: event.description,
          location: event.location,
          date: event.date,
          organizer: event.organizer,
        });
      }
  
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };
  