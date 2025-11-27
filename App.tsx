import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import WikiSection from './components/WikiSection';
import CommentSection from './components/CommentSection';
import ProfilePage from './components/profile/ProfilePage';
<<<<<<< HEAD
import ExamCalendar from './components/ExamCalendar';
=======
import ShareBox from './components/ShareBox';
import CreateContentPage from './components/CreateContentPage';
import LoginPage from './components/LoginPage';
>>>>>>> 2ee1f8844a191a9115fd09945f523699c391c1c1

interface HomePageProps {
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
  return (
    <Layout onLogout={onLogout}>
      <ShareBox />
      <WikiSection />
      <CommentSection />
    </Layout>
  );
};

// Korumalı Route bileşeni
interface ProtectedRouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // localStorage'dan giriş durumunu kontrol et
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exam-calendar" element={<ExamCalendar />} />
=======
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <HomePage onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create" 
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <CreateContentPage />
            </ProtectedRoute>
          } 
        />
>>>>>>> 2ee1f8844a191a9115fd09945f523699c391c1c1
      </Routes>
    </Router>
  );
};

export default App;
