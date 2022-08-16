import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './styles/theme';

import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MakeBookingPage from './pages/MakeBookingPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/make_booking" element={<MakeBookingPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
