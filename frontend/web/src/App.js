import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';

import AuthProvider from './context/auth/AuthProvider';
import RequireAuth from './context/auth/RequireAuth';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import BookingPage from './pages/BookingPage';
import BookingDonePage from './pages/BookingDonePage';
import MyBookingPage from './pages/MyBookingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/sign_up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/booking"
              element={
                <RequireAuth>
                  <BookingPage />
                </RequireAuth>
              }
            />
            <Route
              path="/booking_done"
              element={
                <RequireAuth>
                  <BookingDonePage />
                </RequireAuth>
              }
            />
            <Route
              path="/my_bookings"
              element={
                <RequireAuth>
                  <MyBookingPage />
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
