import React, { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Context";

const RegisterEvent = () => {
  const { contract } = useContext(Web3Context);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTimestamp = Math.floor(new Date(formData.date).getTime() / 1000);
      await contract.createEvent(
        formData.name,
        formData.description,
        formData.location,
        dateTimestamp
      );
      alert("Event registered successfully!");
    } catch (error) {
      console.error(error);
      alert("Error registering event.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-5">Register a New Event</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Event Description"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          className="w-full p-2 border rounded"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default RegisterEvent;
