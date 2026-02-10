import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import AdminPage from './admin/AdminPage';
import { SiteContentProvider } from './content/SiteContentContext';

const App: React.FC = () => {
  return (
    <SiteContentProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </SiteContentProvider>
  );
};

export default App;