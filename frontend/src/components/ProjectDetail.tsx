// src/components/ProjectDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../services/api';

const ProjectDetail = () => {
    const { id } = useParams(); // Get project id from URL
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setError('Project ID is missing');
                setLoading(false);
                return;
            }

            try {
                const data = await getProjectById(Number(id)); // Convert id to number
                setProject(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch project details.');
            } finally {
                setLoading(false);
            }
        };

        // Fetch project data whenever the `id` changes
        fetchProject();
    }, [id]);  // `id` as dependency, re-run when it changes

    if (loading) return <div>Loading...</div>;

    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Project Details</h1>
            {project ? (
                <>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <p>Start Date: {project.startDate}</p>
                    <p>End Date: {project.endDate}</p>
                </>
            ) : (
                <p>No project data available.</p>
            )}
        </div>
    );
};

export default ProjectDetail;
