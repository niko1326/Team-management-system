import React, { useState, useEffect } from 'react';
import { Team } from '../../types/Team';
import { createTeam, updateTeam } from '../../services/teamService';
import { FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

interface TeamFormProps {
    onClose: () => void;
    onTeamCreated: (team: Team) => void;
    onTeamUpdated?: (team: Team) => void;
    editingTeam?: Team | null;
}

const TeamForm: React.FC<TeamFormProps> = ({ 
    onClose, 
    onTeamCreated, 
    onTeamUpdated,
    editingTeam 
}) => {
    const [name, setName] = useState('');

    useEffect(() => {
        if (editingTeam) {
            setName(editingTeam.name);
        }
    }, [editingTeam]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingTeam) {
                const updatedTeam = await updateTeam(editingTeam.id, { ...editingTeam, name });
                onTeamUpdated?.(updatedTeam);
            } else {
                const newTeam = await createTeam({ name });
                onTeamCreated(newTeam);
            }
            onClose();
        } catch (err) {
            console.error('Error saving team:', err);
        }
    };

    return (
        <div className="task-details">
            <div className="task-details-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{editingTeam ? 'Edit Team' : 'Create New Team'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="teamName">Team Name</label>
                        <input
                            id="teamName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter team name"
                            required
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">{editingTeam ? 'Update Team' : 'Create Team'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamForm; 