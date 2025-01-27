import React, { useState, useEffect } from 'react';
import { fetchTeams } from '../services/teamService';
import { Team } from '../types/Team';
import { FaUsers, FaProjectDiagram } from 'react-icons/fa';
import '../styles/Teams.css';

const Teams: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTeams = async () => {
            try {
                const fetchedTeams = await fetchTeams();
                setTeams(fetchedTeams);
            } catch (error) {
                console.error('Failed to load teams:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTeams();
    }, []);

    if (loading) return <div className="loading">Loading teams...</div>;

    return (
        <div className="teams-container">
            <h1>Teams</h1>
            <div className="teams-grid">
                {teams.map(team => (
                    <div key={team.id} className="team-card">
                        <h2>{team.name}</h2>
                        <div className="team-stats">
                            <div className="stat">
                                <FaUsers className="stat-icon" />
                                <span>{team.users.length} Members</span>
                            </div>
                            <div className="stat">
                                <FaProjectDiagram className="stat-icon" />
                                <span>{team.projects.length} Projects</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Teams;
