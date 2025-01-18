import React from 'react';
import ProjectCard from '../components/Project/ProjectCard';

const Projects: React.FC = () => {
    const projects = [
        { name: 'Project A', description: 'Description A', status: 'Active' },
        { name: 'Project B', description: 'Description B', status: 'Inactive' },
    ];

    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <div className="project-list">
                {projects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        name={project.name}
                        description={project.description}
                        status={project.status}
                        onClick={() => console.log('Clicked project')}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
