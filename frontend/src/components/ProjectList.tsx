import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the stylesheet

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
}

interface ProjectListProps {
    projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
    return (
        <div className="project-list-container">
            <h1 className="heading">Projects</h1>
            <div className="project-list">
                {projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <h2 className="project-name">{project.name}</h2>
                        <p className="project-description">{project.description}</p>
                        <span className={`status-badge status-${project.status.toLowerCase()}`}>{project.status}</span>
                        <Link to={`/projects/${project.id}`} className="view-details">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
