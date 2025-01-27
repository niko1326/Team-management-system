import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import TeamSidebar from './TeamSidebar';
import TeamDetails from './TeamDetails';
import './AdminDashboard.css';

const AdminDashboard: React.FC = () => {
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
    const [viewMode, setViewMode] = useState<'projects' | 'users'>('projects');
    const { isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            console.log('Not admin, redirecting to login');
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isAdmin) {
        return <div>Access Denied</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="header-controls">
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
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            <div className="dashboard-content">
                <TeamSidebar
                    selectedTeamId={selectedTeamId}
                    onTeamSelect={setSelectedTeamId}
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
        </div>
    );
};

export default AdminDashboard; 