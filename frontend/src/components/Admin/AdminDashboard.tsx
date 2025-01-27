import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TeamSidebar from './TeamSidebar';
import TeamDetails from './TeamDetails';
import './AdminDashboard.css';
import { Team } from '../../types/Team';
import { fetchTeams } from '../../services/teamService';
import TeamForm from './TeamForm';

const AdminDashboard: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'projects' | 'users'>('projects');
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();
    const [showTeamForm, setShowTeamForm] = useState(false);
    const [editingTeam, setEditingTeam] = useState<Team | null>(null);

    useEffect(() => {
        if (!isAdmin) {
            console.log('Not admin, redirecting to login');
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const teamsData = await fetchTeams();
                setTeams(teamsData);
            } catch (err) {
                console.error('Error loading teams:', err);
            }
        };

        if (isAdmin) {
            loadTeams();
        }
    }, [isAdmin]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleEditTeam = (team: Team) => {
        setEditingTeam(team);
        setShowTeamForm(true);
    };

    const handleAddTeam = () => {
        setShowTeamForm(true);
    };

    const handleTeamCreated = (newTeam: Team) => {
        setTeams(prev => [...prev, newTeam]);
        setShowTeamForm(false);
    };

    const handleTeamUpdated = (updatedTeam: Team) => {
        setTeams(prev => prev.map(team => 
            team.id === updatedTeam.id ? updatedTeam : team
        ));
        setShowTeamForm(false);
        setEditingTeam(null);
    };

    if (!isAdmin) {
        return <div>Access Denied</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Team Management System</h1>
                <div className="user-info">
                    <div className="view-controls">
                        <button 
                            className={`view-toggle ${viewMode === 'projects' ? 'active' : ''}`}
                            onClick={() => setViewMode('projects')}
                        >
                            Projects
                        </button>
                        <button 
                            className={`view-toggle ${viewMode === 'users' ? 'active' : ''}`}
                            onClick={() => setViewMode('users')}
                        >
                            Users
                        </button>
                    </div>
                    <span>Welcome, Admin</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>
            <div className="dashboard-content">
                <TeamSidebar
                    teams={teams}
                    setTeams={setTeams}
                    selectedTeamId={selectedTeamId}
                    onTeamSelect={setSelectedTeamId}
                    onEditTeam={handleEditTeam}
                    onAddTeam={handleAddTeam}
                />
                <div className="main-content">
                    {selectedTeamId && (
                        <TeamDetails
                            teamId={selectedTeamId}
                            viewMode={viewMode}
                        />
                    )}
                </div>
            </div>
            {showTeamForm && (
                <TeamForm
                    onClose={() => {
                        setShowTeamForm(false);
                        setEditingTeam(null);
                    }}
                    onTeamCreated={handleTeamCreated}
                    onTeamUpdated={handleTeamUpdated}
                    editingTeam={editingTeam}
                />
            )}
        </div>
    );
};

export default AdminDashboard; 