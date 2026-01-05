import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './components/RegistrationPage';
import LoginPage from './components/LoginPage';
import CandidateDashboard from './pages/CandidateDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;