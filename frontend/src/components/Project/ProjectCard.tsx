import React from 'react';

interface ProjectCardProps {
    name: string;
    description: string;
    onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, onClick }) => {
    return (
        <div className="project-card" onClick={onClick}>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default ProjectCard;
