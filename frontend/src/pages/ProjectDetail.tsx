import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProjects } from '../services/projectService';
import { Project } from '../types/Project';

const ProjectDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getProject = async () => {
            try {
                const projects = await fetchProjects(); // Fetch all projects
                const foundProject = projects.find((p) => p.id === parseInt(id || '', 10));
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    setError('Project not found');
                }
            } catch (err) {
                setError('Failed to fetch project details');
            }
        };
        getProject();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div className="project-detail">
            <h2>{project.name}</h2>
            <p>{project.description}</p>
        </div>
    );
};

export default ProjectDetail;
