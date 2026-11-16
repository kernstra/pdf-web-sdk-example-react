import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './app.css';
import App from './App.tsx';

// StrictMode mounts every effect twice in development: DocumentViewer
// cleans up after the first run, so one viewer remains.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
