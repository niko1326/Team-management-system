import React, { useState, useEffect } from 'react';
import TeamTable from '../components/Team/TeamTable';
import { fetchTeams } from '../services/teamService';
import { Team } from '../types/Team';

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

    if (loading) return <p>Loading teams...</p>;

    return (
        <div className="teams-container">
            <h1 className="heading">Teams</h1>
            <TeamTable teams={teams} />
        </div>
    );
};

export default Teams;
