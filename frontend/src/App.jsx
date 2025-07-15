import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Pages
import WelcomePage from './pages/WelcomePage';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import NoticeBoard from './pages/NoticeBoard';
import MessageDetails from './pages/MessageDetails';

// General Authenticated Pages
import SubmitMessage from './pages/SubmitMessage';
import Approvals from './pages/Approvals';
import MyMessages from './pages/MyMessages';

// Chairman Features
import ChairmanNoticeBoard from './pages/ChairmanNoticeBoard';

// Dashboards (Role-Based)
import EmployeeDashboard from './pages/EmployeeDashboard';
import TeamLeadDashboard from './pages/TeamLeadDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import HODDashboard from './pages/HODDashboard';
import DirectorDashboard from './pages/DirectorDashboard';
import VPDashboard from './pages/VPDashboard';
import CEODashboard from './pages/CEODashboard';
import ChairmanDashboard from './pages/ChairmanDashboard';

// Admin Features
import AddUserForm from './components/AddUserForm';

// Route Protection
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/notice-board" element={<NoticeBoard />} />
        <Route path="/message/:id" element={<MessageDetails />} />

        {/* 🔐 Authenticated Routes (Any logged-in user) */}
        <Route path="/submit" element={<PrivateRoute><SubmitMessage /></PrivateRoute>} />
        <Route path="/approvals" element={<PrivateRoute><Approvals /></PrivateRoute>} />
        <Route path="/my-messages" element={<PrivateRoute><MyMessages /></PrivateRoute>} />

        {/* 🔐 Special Role Features */}
        <Route path="/chairman/post-notice" element={
          <PrivateRoute allowedRoles={['chairman']}>
            <ChairmanNoticeBoard />
          </PrivateRoute>
        } />

        <Route path="/admin/add-user" element={
          <PrivateRoute allowedRoles={['ceo', 'chairman']}>
            <AddUserForm />
          </PrivateRoute>
        } />

        {/* 🔐 Role-Based Dashboards */}
        <Route path="/employee/dashboard" element={
          <PrivateRoute allowedRoles={['employee']}>
            <EmployeeDashboard />
          </PrivateRoute>
        } />

        <Route path="/team_lead/dashboard" element={
          <PrivateRoute allowedRoles={['team_lead']}>
            <TeamLeadDashboard />
          </PrivateRoute>
        } />

        <Route path="/manager/dashboard" element={
          <PrivateRoute allowedRoles={['manager']}>
            <ManagerDashboard />
          </PrivateRoute>
        } />

        <Route path="/hod/dashboard" element={
          <PrivateRoute allowedRoles={['hod']}>
            <HODDashboard />
          </PrivateRoute>
        } />

        <Route path="/director/dashboard" element={
          <PrivateRoute allowedRoles={['director']}>
            <DirectorDashboard />
          </PrivateRoute>
        } />

        <Route path="/vp/dashboard" element={
          <PrivateRoute allowedRoles={['vp']}>
            <VPDashboard />
          </PrivateRoute>
        } />

        <Route path="/ceo/dashboard" element={
          <PrivateRoute allowedRoles={['ceo']}>
            <CEODashboard />
          </PrivateRoute>
        } />

        <Route path="/chairman/dashboard" element={
          <PrivateRoute allowedRoles={['chairman']}>
            <ChairmanDashboard />
          </PrivateRoute>
        } />

      </Routes>
    </Router>
  );
}
