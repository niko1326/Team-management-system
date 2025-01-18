// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Importing necessary components for routing
import ProjectList from './components/ProjectList';  // Importing the ProjectList component
import ProjectDetail from './components/ProjectDetail';  // Importing the ProjectDetail component
import NewProject from './components/NewProject';  // Importing the NewProject component

const App = () => {
    return (
        <Router>  {/* Wrapping the routes inside BrowserRouter */}
            <Routes>  {/* Declaring the routes */}
                <Route path="/" element={<ProjectList />} />  {/* Home page route that shows the list of projects */}
                <Route path="/projects/:id" element={<ProjectDetail />} />  {/* Route for viewing project details by id */}
                <Route path="/projects/new" element={<NewProject />} />  {/* Route for creating a new project */}
            </Routes>
        </Router>
    );
};

export default App;
