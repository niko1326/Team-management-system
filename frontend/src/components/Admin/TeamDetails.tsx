import React, { useState, useEffect, useRef } from 'react';
import { Team } from '../../types/Team';
import { Project } from '../../types/Project';
import { User } from '../../types/User';
import { getTeamById } from '../../services/teamService';
import { fetchProjectsByTeamId, deleteProject, createProject } from '../../services/projectService';
import { fetchAllUsers, assignUserToTeam, addUserToTeam, removeUserFromTeam, updateUser, createUser, deleteUser } from '../../services/userService';
import './AdminDashboard.css';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import ProjectDetails from '../Project/ProjectDetails';
import UserForm from './UserForm';
import { generateRandomUser } from '../../services/randomUserService';

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
    const [showAddProject, setShowAddProject] = useState<boolean>(false);
    const [newProjectTitle, setNewProjectTitle] = useState<string>('');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const addProjectRef = useRef<HTMLDivElement | null>(null);
    const [showAddUser, setShowAddUser] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

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

    const handleDeleteProject = async (projectId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId);
                setProjects(prev => prev.filter(project => project.id !== projectId));
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    // Add click outside handler
    const handleClickOutside = (event: MouseEvent) => {
        if (addProjectRef.current && !addProjectRef.current.contains(event.target as Node)) {
            setShowAddProject(false);
        }
    };

    useEffect(() => {
        if (showAddProject) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showAddProject]);

    const handleAddProject = async () => {
        if (!newProjectTitle.trim() || !teamId) return;

        try {
            const newProject = await createProject({
                name: newProjectTitle.trim(),
                description: '',
                team: { id: teamId } as Team
            });
            setProjects(prev => [...prev, newProject]);
            setNewProjectTitle('');
            setShowAddProject(false);
        } catch (error) {
            console.error('Failed to create project:', error);
        }
    };

    const handleProjectSelect = (project: Project) => {
        setShowAddProject(false);
        setEditingProject(project);
    };

    const handleProjectUpdate = (updatedProject: Project) => {
        setProjects(prev => prev.map(project => 
            project.id === updatedProject.id ? updatedProject : project
        ));
        setEditingProject(null);
    };

    const handleUserUpdate = async (userId: number, updates: Partial<User>) => {
        try {
            await updateUser(userId, updates);
            await loadTeamData(); // Refresh the data
        } catch (error) {
            setError('Failed to update user');
            console.error('Error updating user:', error);
        }
    };

    const handleGenerateRandomUser = async () => {
        try {
            const randomUserData = await generateRandomUser();
            const newUser = await createUser(randomUserData);
            await addUserToTeam(teamId, newUser.id);
            await loadTeamData();
        } catch (error) {
            setError('Failed to generate random user');
            console.error('Error generating random user:', error);
        }
    };

    const handleEditUser = (user: User) => {
        setEditingUser(user);
        setShowAddUser(true);
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                setAllUsers(prev => prev.filter(user => user.id !== userId));
            } catch (error) {
                setError('Failed to delete user');
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading) return <div>Loading team details...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (!team) return <div>Team not found</div>;

    return (
        <div className="team-details">
            <div className="team-header">
                <h2>{team.name}</h2>
                {viewMode === 'users' && (
                    <button 
                        className="generate-user-button"
                        onClick={handleGenerateRandomUser}
                    >
                        <FaPlus /> Generate Random User
                    </button>
                )}
            </div>
            {viewMode === 'projects' ? (
                <div className="project-manager">
                    <div className="project-list">
                        {projects.map(project => (
                            <div 
                                key={project.id}
                                className="project-item"
                                onClick={() => handleProjectSelect(project)}
                            >
                                <div className="project-content">
                                    <div className="project-text">
                                        <h3>{project.name}</h3>
                                        <p className="project-description">
                                            {project.description || 'No description provided'}
                                        </p>
                                    </div>
                                    <button 
                                        className="delete-button"
                                        onClick={(e) => handleDeleteProject(project.id, e)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-project-section" ref={addProjectRef}>
                        {showAddProject ? (
                            <div className="add-project-form">
                                <input
                                    type="text"
                                    placeholder="Enter project name"
                                    value={newProjectTitle}
                                    onChange={(e) => setNewProjectTitle(e.target.value)}
                                    className="project-input"
                                />
                                <button onClick={handleAddProject} className="add-button">
                                    Add Project
                                </button>
                                <button onClick={() => setShowAddProject(false)} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={() => {
                                    setEditingProject(null);
                                    setShowAddProject(true);
                                }} 
                                className="add-project-button"
                            >
                                <FaPlus /> Add Project
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="project-manager">
                    <div className="project-list">
                        {allUsers.map(user => (
                            <div key={user.id} className="project-item">
                                <div className="project-content">
                                    <div className="project-text">
                                        <h3>{user.username}</h3>
                                        <p className="project-description">{user.email}</p>
                                        {user.teams && user.teams.length > 0 && (
                                            <p className="project-description">
                                                Teams: {user.teams.map(t => t.name).join(', ')}
                                            </p>
                                        )}
                                    </div>
                                    <div className="user-controls">
                                        <input
                                            type="checkbox"
                                            checked={user.teams?.some(t => t.id === teamId)}
                                            onChange={(e) => handleUserAssignment(user.id, e.target.checked)}
                                        />
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEditUser(user)}
                                            title="Edit User"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDeleteUser(user.id)}
                                            title="Delete User"
                                        >
                                            <FaTrash />
                                        </button>
                                        {user.isAdmin && <span className="admin-badge">Admin</span>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-project-section">
                        <button 
                            className="add-project-button"
                            onClick={() => setShowAddUser(true)}
                        >
                            <FaPlus /> Add User
                        </button>
                    </div>
                </div>
            )}
            
            {editingProject && (
                <ProjectDetails
                    project={editingProject}
                    onClose={() => setEditingProject(null)}
                    onUpdate={handleProjectUpdate}
                />
            )}

            {showAddUser && (
                <UserForm
                    teamId={teamId}
                    onClose={() => {
                        setShowAddUser(false);
                        setEditingUser(null);
                    }}
                    onUserCreated={async (newUser) => {
                        setAllUsers(prev => 
                            editingUser 
                                ? prev.map(u => u.id === editingUser.id ? newUser : u)
                                : [...prev, newUser]
                        );
                        setShowAddUser(false);
                        setEditingUser(null);
                        await loadTeamData();
                    }}
                    editingUser={editingUser}
                />
            )}
        </div>
    );
};

export default TeamDetails; 