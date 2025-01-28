import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { getTeamUsers, getTeamProjects } from '../../services/teamService';
import { User } from '../../types/User';
import { Project } from '../../types/Project';
import { Team } from '../../types/Team';
import UserForm from '../Admin/UserForm';
import ProjectForm from '../Project/ProjectForm';

interface TeamDetailsProps {
    team: Team;
    onClose: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onClose }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        fetchTeamData();
    }, [team.id]);

    const fetchTeamData = async () => {
        try {
            const [usersResponse, projectsResponse] = await Promise.all([
                getTeamUsers(team.id),
                getTeamProjects(team.id)
            ]);
            setUsers(usersResponse);
            setProjects(projectsResponse);
        } catch (error) {
            console.error('Error fetching team data:', error);
        }
    };

    return (
        <div className="team-details">
            <div className="team-details-content">
                <button className="close-button" onClick={onClose}><FaTimes /></button>
                <h2>{team.name}</h2>
                
                <div className="section">
                    <div className="section-header">
                        <h3>Team Members</h3>
                        <button 
                            className="add-button"
                            onClick={() => setShowUserForm(true)}
                        >
                            <FaPlus /> Add Member
                        </button>
                    </div>
                    <div className="cards-grid">
                        {users.map(user => (
                            <div key={user.id} className="card">
                                <div className="card-header">
                                    <h4>{user.username}</h4>
                                    {user.isAdmin && <span className="admin-badge">Admin</span>}
                                </div>
                                <div className="card-content">
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <div className="section-header">
                        <h3>Projects</h3>
                        <button 
                            className="add-button"
                            onClick={() => setShowProjectForm(true)}
                        >
                            <FaPlus /> Add Project
                        </button>
                    </div>
                    <div className="cards-grid">
                        {projects.map(project => (
                            <div key={project.id} className="card">
                                <div className="card-header">
                                    <h4>{project.name}</h4>
                                </div>
                                <div className="card-content">
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {showUserForm && (
                <UserForm
                    teamId={team.id}
                    onClose={() => setShowUserForm(false)}
                    onUserCreated={async () => {
                        await fetchTeamData();
                        setShowUserForm(false);
                    }}
                />
            )}
            
            {showProjectForm && (
                <ProjectForm
                    teamId={team.id}
                    onClose={() => setShowProjectForm(false)}
                    onProjectCreated={async () => {
                        await fetchTeamData();
                        setShowProjectForm(false);
                    }}
                />
            )}
        </div>
    );
};

export default TeamDetails; 