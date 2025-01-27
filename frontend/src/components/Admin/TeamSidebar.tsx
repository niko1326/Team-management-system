import React, { useState, useEffect } from 'react';
import { Team } from '../../types/Team';
import { fetchTeams } from '../../services/teamService';
import { useAuth } from '../../contexts/AuthContext';
import TeamForm from '../Admin/TeamForm';
import { FaPlus } from 'react-icons/fa';
import './AdminDashboard.css';

interface TeamSidebarProps {
    selectedTeamId: number | null;
    onTeamSelect: (teamId: number) => void;
}

const TeamSidebar: React.FC<TeamSidebarProps> = ({ selectedTeamId, onTeamSelect }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showTeamForm, setShowTeamForm] = useState(false);
    const { isAdmin } = useAuth();

    useEffect(() => {
        if (!isAdmin) {
            setError('Admin access required');
            setLoading(false);
            return;
        }

        const loadTeams = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log('Fetching teams...');
                const fetchedTeams = await fetchTeams();
                console.log('Fetched teams:', fetchedTeams);
                setTeams(fetchedTeams);
                if (fetchedTeams.length > 0 && !selectedTeamId) {
                    onTeamSelect(fetchedTeams[0].id);
                }
            } catch (err) {
                console.error('Error loading teams:', err);
                setError('Failed to load teams. Please try logging in again.');
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, [isAdmin, selectedTeamId, onTeamSelect]);

    const handleAddTeam = () => {
        setShowTeamForm(true);
    };

    const handleTeamCreated = (newTeam: Team) => {
        setTeams(prev => [...prev, newTeam]);
        setShowTeamForm(false);
    };

    if (loading) return <div>Loading teams...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!isAdmin) return <div className="error-message">Admin access required</div>;

    return (
        <div className="team-sidebar">
            <div className="sidebar-header">
                <h2>Teams</h2>
                <button className="add-button" onClick={handleAddTeam}>
                    <FaPlus />
                </button>
            </div>
            <div className="team-list">
                {teams.map(team => (
                    <div
                        key={team.id}
                        className={`team-item ${selectedTeamId === team.id ? 'selected' : ''}`}
                        onClick={() => onTeamSelect(team.id)}
                    >
                        {team.name}
                    </div>
                ))}
            </div>
            {showTeamForm && (
                <TeamForm
                    onClose={() => setShowTeamForm(false)}
                    onTeamCreated={handleTeamCreated}
                />
            )}
        </div>
    );
};

export default TeamSidebar; 