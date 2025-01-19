import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/Project/ProjectCard';
import { fetchProjects } from '../services/projectService';
import { Project } from '../types/Project';

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (err) {
                setError('Failed to fetch projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getProjects();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <div className="project-list">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description}
                        onClick={() => console.log(`Clicked project: ${project.name}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
