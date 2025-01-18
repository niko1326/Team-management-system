import React from 'react';

interface ProjectCardProps {
    name: string;
    description: string;
    status: string;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, status, onClick }) => {
    return (
        <div className="project-card" onClick={onClick}>
            <h3>{name}</h3>
            <p>{description}</p>
            <span className={`status ${status.toLowerCase()}`}>{status}</span>
        </div>
    );
};

export default ProjectCard;
