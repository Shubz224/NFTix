import React, { useState } from 'react';
import './ClaimAttendanceForm.scss'; // Import the SCSS for styling

const ClaimAttendanceForm = () => {
  const [eventCode, setEventCode] = useState('');
  const [userName, setUserName] = useState('');

  const handleClaim = (e) => {
    e.preventDefault();
    // Logic to claim attendance
    console.log('Attendance Claimed:', { eventCode, userName });
  };

  return (
    <form className="claim-attendance-form" onSubmit={handleClaim}>
      <h2>Claim Attendance</h2>

      <div>
        <label htmlFor="eventCode">Event Code</label>
        <input
          type="text"
          id="eventCode"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="userName">Your Name</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <button type="submit">Claim Attendance</button>

      <div className="form-footer">
        <p>Ensure your information is correct before submitting!</p>
      </div>
    </form>
  );
};

export default ClaimAttendanceForm;
