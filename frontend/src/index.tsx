// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';  // Importing the root render function from react-dom/client
import App from './App';  // Importing the App component

// Selecting the root element where the app will be mounted
const root = createRoot(document.getElementById('root')!);

// Rendering the App component
root.render(
    <App />  // Rendering the App compfronent which contains the routes
);
