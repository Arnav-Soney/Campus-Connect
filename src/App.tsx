import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OTPVerification from './pages/OTPVerification';
import Dashboard from './pages/Dashboard';
import PlacementCalendar from './pages/PlacementCalendar';
import FoodOrdering from './pages/FoodOrdering';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import AddListing from './pages/AddListing';
import ListingDetail from './pages/ListingDetail';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/verify-otp" element={<PublicRoute><OTPVerification /></PublicRoute>} />
            
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/placements" element={<PrivateRoute><PlacementCalendar /></PrivateRoute>} />
            <Route path="/food" element={<PrivateRoute><FoodOrdering /></PrivateRoute>} />
            <Route path="/marketplace" element={<PrivateRoute><Marketplace /></PrivateRoute>} />
            <Route path="/marketplace/add" element={<PrivateRoute><AddListing /></PrivateRoute>} />
            <Route path="/marketplace/:id" element={<PrivateRoute><ListingDetail /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}