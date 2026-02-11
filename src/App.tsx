import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LegalPage from './pages/LegalPage';
import { SiteContentProvider } from './content/SiteContentContext';
import ThemeInjector from './components/ThemeInjector';

function App() {
  return (
    <SiteContentProvider>
      <ThemeInjector />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<LegalPage type="privacy" />} />
          <Route path="/accessibility" element={<LegalPage type="accessibility" />} />
          <Route path="/terms" element={<LegalPage type="terms" />} />
        </Routes>
      </Router>
    </SiteContentProvider>
  );
}

export default App;