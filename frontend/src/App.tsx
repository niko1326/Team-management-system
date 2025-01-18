import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/Project/ProjectDetail';

const App: React.FC = () => {
    const projects = [
        { id: '1', name: 'Project Alpha', description: 'Alpha project description.', status: 'Active' },
        { id: '2', name: 'Project Beta', description: 'Beta project description.', status: 'Inactive' },
    ];

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProjectListWrapper projects={projects} />} />
                <Route path="/projects/:id" element={<ProjectDetailWrapper projects={projects} />} />
            </Routes>
        </Router>
    );
};

// Wrapper for ProjectList
const ProjectListWrapper: React.FC<{ projects: any[] }> = ({ projects }) => {
    return <ProjectList projects={projects} />;
};

// Wrapper for ProjectDetail
const ProjectDetailWrapper: React.FC<{ projects: any[] }> = ({ projects }) => {
    return <ProjectDetail projects={projects} />;
};

export default App;
