import React, { useState } from 'react';
import { Team } from '../../types/Team';
import { createTeam } from '../../services/teamService';
import './AdminDashboard.css';

interface TeamFormProps {
    onClose: () => void;
    onTeamCreated: (team: Team) => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ onClose, onTeamCreated }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newTeam = await createTeam({ name });
            onTeamCreated(newTeam);
        } catch (err) {
            console.error('Error creating team:', err);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Team</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Team Name"
                        required
                    />
                    <div className="button-group">
                        <button type="submit">Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamForm; 