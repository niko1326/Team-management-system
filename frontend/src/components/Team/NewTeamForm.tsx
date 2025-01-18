import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTeam } from '../../services/teamService'; // Ensure this matches your actual service path
import '../../styles/styles.css'; // Import your styles

const NewTeamForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const newTeam = {
                name,
                description,
            };

            await createTeam(newTeam); // API call to save the team
            navigate('/teams'); // Redirect to the teams list
        } catch (err) {
            setError('Failed to create team. Please try again.');
        }
    };

    return (
        <div className="new-team-form-container">
            <h1 className="heading">Create New Team</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Team Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter team name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter team description"
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Create Team
                </button>
            </form>
        </div>
    );
};

export default NewTeamForm;
