import React, { useState } from "react";


const LeavePage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!leaveType || !startDate || !reason) {
      setError("Leave Type, Start Date, and Reason are required.");
      return;
    }

    const newRequest = {
      leaveType,
      startDate,
      reason,
      status: "Pending", 
    };

    setLeaveRequests([...leaveRequests, newRequest]);
    setLeaveType("");
    setStartDate("");
    setReason("");
    setError("");
  };

  return (
    <div className="leave-page">
      <h1>Leave Management</h1>

      <form onSubmit={handleSubmit} className="leave-form">
        <h2>Request Leave</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="leaveType">Leave Type:</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Paid Leave">Paid Leave</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <button type="submit">Submit Request</button>
      </form>

      {/* Leave Requests Table */}
      <h2>Leave History</h2>
      <table className="leave-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Start Date</th>
            <th>Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.length > 0 ? (
            leaveRequests.map((request, index) => (
              <tr key={index}>
                <td>{request.leaveType}</td>
                <td>{request.startDate}</td>
                <td>{request.reason}</td>
                <td>{request.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No leave requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeavePage;
