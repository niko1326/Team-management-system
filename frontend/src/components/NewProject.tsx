// src/components/NewProject.tsx

import React, { useState } from 'react';
import { createProject } from '../services/api';
import { useNavigate } from 'react-router-dom';

const NewProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();  // Changed from useHistory to useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const project = { name, description, startDate, endDate };

        try {
            await createProject(project);
            navigate('/');  // Changed from history.push to navigate
        } catch (err) {
            setError('Failed to create project');
        }
    };

    return (
        <div>
            <h1>Create a New Project</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <label>Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
                <label>End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default NewProject;
