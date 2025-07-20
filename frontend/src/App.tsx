import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Courses } from './pages/Courses';
import { Dashboard } from './pages/Dashboard';
import './index.css';

// Landing page components
import Header from './components/Header';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Footer from './components/Footer';

const queryClient = new QueryClient();

// Landing Page Component
const LandingPage = () => (
  <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
    <Header />
    <Hero />
    <Stats />
    <Features />
    <Footer />
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* App Pages */}
            <Route path="/home" element={
              <>
                <Navbar />
                <Home />
              </>
            } />
            <Route path="/login" element={
              <>
                <Navbar />
                <Login />
              </>
            } />
            <Route path="/register" element={
              <>
                <Navbar />
                <Register />
              </>
            } />
            <Route path="/courses" element={
              <>
                <Navbar />
                <Courses />
              </>
            } />
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <Dashboard />
              </>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

