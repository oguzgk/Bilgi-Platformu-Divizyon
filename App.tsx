import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import WikiSection from './components/WikiSection';
import CommentSection from './components/CommentSection';
import ProfilePage from './components/profile/ProfilePage';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <WikiSection />
      <CommentSection />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
