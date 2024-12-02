import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Attendance from "./components/Attendance/Attendance";
import LoginPage from "./components/Login/Login";
import React from "react";
import LeavePage from "./components/Leave/Leave";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true); 
  };

  return (
    <Router>
      {isAuthenticated && <Sidebar />}
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<LeavePage />} />
        <Route path="*" element={<div>404 Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
};

export default App;
