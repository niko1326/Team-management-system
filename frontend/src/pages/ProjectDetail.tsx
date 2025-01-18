import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/Project/ProjectDetail';
import { fetchProjects } from '../services/projectService';
import { Project } from '../types/Project';

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const fetchedProjects = await fetchProjects();
                const updatedProjects = fetchedProjects.map((project) => ({
                    ...project,
                    tasks: project.tasks || [], // Ensure tasks is an empty array if undefined
                }));
                setProjects(updatedProjects);
            } catch (error) {
                console.error('Failed to load projects:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    if (loading) return <p>Loading project details...</p>;

    return (
        <div className="project-detail-page">
            <h1 className="heading">Project Detail</h1>
            <ProjectDetail projects={projects} />
        </div>
    );
};

export default ProjectDetailPage;
