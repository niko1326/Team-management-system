// src/components/ProjectList.tsx
import React, { useEffect, useState } from 'react';
import { getProjects } from '../services/api';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Projects</h1>
            {projects.length === 0 ? (
                <p>No projects available</p>
            ) : (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            {/* Make sure the URL points to /projects/{id} */}
                            <Link to={`/projects/${project.id}`}>{project.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;
