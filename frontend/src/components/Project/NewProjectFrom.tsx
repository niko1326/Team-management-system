import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectService'; // Ensure this matches your actual service path
import '../../styles/styles.css'; // Import your styles or use Tailwind if applicable

const NewProjectForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Active');
    const [teamId, setTeamId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(''); // Clear previous error messages

        try {
            const newProject = {
                name,
                description,
                status,
                teamId,
            };

            await createProject(newProject); // API call to save the project
            navigate('/projects'); // Redirect to the projects list
        } catch (err) {
            setError('Failed to create project. Please try again.');
        }
    };

    return (
        <div className="new-project-form-container">
            <h1 className="heading">Create New Project</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter project name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter project description"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="team">Assign Team</label>
                    <input
                        type="text"
                        id="team"
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        placeholder="Enter team ID"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Create Project
                </button>
            </form>
        </div>
    );
};

export default NewProjectForm;
