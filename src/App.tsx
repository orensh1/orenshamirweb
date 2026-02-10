
import React, { useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StyleShowcase from './components/StyleShowcase';
import About from './components/About';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';
import Accessibility from './components/Accessibility';
import CookieConsent from './components/CookieConsent';
import { SiteContentProvider } from './content/SiteContentContext';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Navbar'; // Assuming Navbar is the Header, or we keep Navbar inside Home? 
// Wait, Navbar is inside Home in Home.tsx. App.tsx had Navbar outside.
// Let's use Home component for the main route.
import ThemeInjector from './components/ThemeInjector';
import Home from './Home';

const App: React.FC = () => {
  return (
    <SiteContentProvider>
      <ThemeInjector />
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </SiteContentProvider>
  );
};

export default App;