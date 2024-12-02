import React, { useState } from "react";
import { useWeb3 } from "../context/Web3Context"; // Correct import
import './EventCreationForm.scss';

const EventCreationForm = () => {
  const { contract, account } = useWeb3(); // Correct hook usage
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateEvent = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !description || !location || !date) {
      alert("Please fill in all the fields!");
      return;
    }

    if (!contract || !account) {
      alert("Contract or account is not available!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Parse the date to a timestamp
      const eventDate = new Date(date).getTime() / 1000; // Convert to Unix timestamp

      // Call the smart contract's createEvent function
      const tx = await contract.createEvent(name, description, location, eventDate, { from: account });
      await tx.wait(); // Wait for the transaction to be mined

      alert(`Event "${name}" created successfully!`);
    } catch (err) {
      setError("Failed to create event. Please try again.");
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-creation-form-wrapper">
      <form className="event-creation-form" onSubmit={handleCreateEvent}>
        <h3>Create an Event</h3>

        <div>
          <label htmlFor="name">Event Name</label>
          <input
            type="text"
            id="name"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            id="description"
            placeholder="Event Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location">Event Location</label>
          <input
            type="text"
            id="location"
            placeholder="Event Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="date">Event Date</label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default EventCreationForm;
