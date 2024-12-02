import React, { useState, useEffect } from 'react';
import './attendance.css';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [status, setStatus] = useState('');

  // Mock attendance data
  useEffect(() => {
    const mockData = {
      '2024-11-25': 'Absent',
      '2024-12-01': 'Absent',
      '2024-11-20': 'Present',
      '2024-12-21': 'Absent',
      '2024-12-22': 'Absent',
      '2024-12-05': 'Present',
    };
    setAttendanceData(mockData);
  }, []);

  const submitAttendance = () => {
    const today = new Date().toISOString().split('T')[0];

    if (attendanceData[today]) {
      setStatus('Attendance for today has already been submitted.');
      return;
    }

    setAttendanceData((prevData) => ({
      ...prevData,
      [today]: 'Pending Approval',
    }));
    setStatus('Attendance submitted for approval.');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'green';
      case 'Absent':
        return 'red';
      case 'Pending Approval':
        return 'orange';
      default:
        return 'gray';
    }
  };

  // Render calendar for the current month
  const renderCalendarForMonth = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const calendar = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = attendanceData[dateKey] || 'Not Submitted';

      calendar.push(
        <div
          key={dateKey}
          style={{
            backgroundColor: getStatusColor(status),
            color: 'white',
            padding: '10px',
            margin: '5px',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            maxWidth: '400px'
          }}
          title={status}
        >
          {day}
        </div>
      );
    }

    return calendar;
  };

  // Navigate to previous or next month
  const handlePreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ flex: 1, border: '1px solid #ddd', padding: '10px' }}>
        <h2>Attendance Summary</h2>
        <p>
          <strong>Days Present:</strong> {Object.values(attendanceData).filter((s) => s === 'Present').length}
        </p>
        <p>
          <strong>Days Absent:</strong> {Object.values(attendanceData).filter((s) => s === 'Absent').length}
        </p>
        <p>
          <strong>Pending Approvals:</strong> {Object.values(attendanceData).filter((s) => s === 'Pending Approval').length}
        </p>

        {/* Quick Actions */}
        <button onClick={() => alert("Today's attendance viewed!")}>View Today's Attendance</button>
        <button onClick={() => alert('Exporting attendance data...')} style={{ marginTop: '10px' }}>
          Export Attendance Data
        </button>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 2, border: '1px solid #ddd', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <button onClick={handlePreviousMonth}>Previous</button>
          <h3>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </h3>
          <button onClick={handleNextMonth}>Next</button>
        </div>

        {/* Calendar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {renderCalendarForMonth(currentMonth.getFullYear(), currentMonth.getMonth())}
        </div>

        {/* Submit Attendance */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={submitAttendance} style={{ padding: '10px 20px' }}>
            Submit Today's Attendance
          </button>
          {status && <p style={{ color: 'blue', marginTop: '10px' }}>{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
