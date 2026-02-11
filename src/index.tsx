import React from 'react';
import ReactDOM from 'react-dom/client';
import './index-v27.css';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

import ErrorBoundary from './ErrorBoundary';

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>
);