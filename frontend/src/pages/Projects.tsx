import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/Project/ProjectCard';
import { fetchProjects } from '../services/projectService';
import { Project } from '../types/Project';
import './Projects.css';
import { useAuth } from '../contexts/AuthContext';

const Projects: React.FC = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProjects = async () => {
            try {
                if (user?.username) {
                    const data = await fetchProjects(user.username);
                    setProjects(data);
                }
            } catch (err) {
                setError('Failed to fetch projects');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getProjects();
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="projects-container">
            <h1>Projects</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        name={project.name}
                        description={project.description || ''}
                        onClick={() => console.log(`Clicked project: ${project.name}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;
