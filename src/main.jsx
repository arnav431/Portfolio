import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/main.css';
import './styles/upgrade.css';
import './styles/sections.css';
import './styles/responsive.css';
import './styles/hero-zoom.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
