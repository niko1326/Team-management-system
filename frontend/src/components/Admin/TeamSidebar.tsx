import React from 'react';
import { Team } from '../../types/Team';
import { deleteTeam } from '../../services/teamService';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import './TeamSidebar.css';

interface TeamSidebarProps {
    teams: Team[];
    selectedTeamId: number | null;
    onTeamSelect: (teamId: number | null) => void;
    setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
    onEditTeam: (team: Team) => void;
    onAddTeam?: () => void;
}

const TeamSidebar: React.FC<TeamSidebarProps> = ({
    teams,
    selectedTeamId,
    onTeamSelect,
    setTeams,
    onEditTeam,
    onAddTeam
}) => {
    const handleDeleteTeam = async (teamId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this team?')) {
            try {
                await deleteTeam(teamId);
                setTeams(prev => prev.filter(team => team.id !== teamId));
                if (selectedTeamId === teamId) {
                    onTeamSelect(null);
                }
            } catch (err) {
                console.error('Error deleting team:', err);
                alert('Error deleting team. Please try again.');
            }
        }
    };

    return (
        <div className="team-sidebar">
            <div className="team-header">
                <h2>Teams</h2>
                <button 
                    className="add-team-button"
                    onClick={onAddTeam}
                    title="Add new team"
                >
                    <FaPlus />
                </button>
            </div>
            <div className="team-list">
                {teams.map((team) => (
                    <div
                        key={team.id}
                        className={`team-item ${team.id === selectedTeamId ? 'selected' : ''}`}
                        onClick={() => onTeamSelect(team.id)}
                    >
                        <div className="team-content">
                            <div className="team-text">
                                <h3>{team.name}</h3>
                            </div>
                            <button 
                                className="edit-button action-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditTeam(team);
                                }}
                            >
                                <FaEdit />
                            </button>
                            <button 
                                className="delete-button action-button"
                                onClick={(e) => handleDeleteTeam(team.id, e)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSidebar; 