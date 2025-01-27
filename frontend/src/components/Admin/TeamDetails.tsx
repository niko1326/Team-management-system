import React, { useState, useEffect } from 'react';
import { Team } from '../../types/Team';
import { Project } from '../../types/Project';
import { User } from '../../types/User';
import { getTeamById } from '../../services/teamService';
import { fetchProjectsByTeamId } from '../../services/projectService';
import { fetchAllUsers, assignUserToTeam, addUserToTeam, removeUserFromTeam } from '../../services/userService';
import './AdminDashboard.css';

interface TeamDetailsProps {
    teamId: number;
    viewMode: 'projects' | 'users';
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ teamId, viewMode }) => {
    const [team, setTeam] = useState<Team | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [teamUsers, setTeamUsers] = useState<User[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadTeamData = async () => {
        try {
            setLoading(true);
            const teamData = await getTeamById(teamId);
            setTeam(teamData);

            if (viewMode === 'projects') {
                const projectsData = await fetchProjectsByTeamId(teamId);
                setProjects(projectsData);
            } else if (viewMode === 'users') {
                const allUsersData = await fetchAllUsers();
                const usersWithTeamStatus = allUsersData.map(user => ({
                    ...user,
                    teams: user.teams || [],
                    isInTeam: user.teams?.some(team => team.id === teamId) || false
                }));
                setAllUsers(usersWithTeamStatus);
                
                // Map TeamUser[] to User[]
                const mappedTeamUsers = teamData.users.map(user => ({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.role === 'ADMIN',
                    teams: [{
                        id: teamId,
                        name: teamData.name
                    }]
                }));
                setTeamUsers(mappedTeamUsers);
            }
        } catch (err) {
            setError('Failed to load team data');
            console.error('Error loading team data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeamData();
    }, [teamId, viewMode]);

    const handleUserAssignment = async (userId: number, checked: boolean) => {
        try {
            if (checked) {
                await addUserToTeam(teamId, userId);
            } else {
                await removeUserFromTeam(teamId, userId);
            }
            await loadTeamData(); // Refresh data after assignment
        } catch (err) {
            setError('Failed to update user assignment');
            console.error('Error updating user assignment:', err);
        }
    };

    const isUserInTeam = (userId: number) => {
        return teamUsers.some(user => user.id === userId);
    };

    if (loading) return <div>Loading team details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!team) return <div>Team not found</div>;

    return (
        <div className="team-details">
            <h2>{team.name}</h2>
            {viewMode === 'projects' ? (
                <div className="project-manager">
                    <div className="projects-grid">
                        {projects.map(project => (
                            <div key={project.id} className="project-item">
                                <div className="project-header">
                                    <h3>{project.name}</h3>
                                </div>
                                <div className="project-content">
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="users-list">
                    {allUsers.map(user => (
                        <div key={user.id} className="user-card">
                            <div className="user-checkbox">
                                <input
                                    type="checkbox"
                                    checked={user.teams?.some(t => t.id === teamId)}
                                    onChange={(e) => handleUserAssignment(user.id, e.target.checked)}
                                />
                                <span className="user-name">{user.username}</span>
                            </div>
                            <div className="user-info">
                                <p>{user.email}</p>
                                {user.teams && user.teams.length > 0 && (
                                    <div className="user-teams">
                                        Teams: {user.teams.map(t => t.name).join(', ')}
                                    </div>
                                )}
                                {user.isAdmin && <span className="admin-badge">Admin</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TeamDetails; 