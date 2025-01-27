import React from 'react';
import { Team } from '../../types/Team';

interface TeamTableProps {
    teams: Team[];
}

const TeamTable: React.FC<TeamTableProps> = ({ teams }) => {
    return (
        <table className="team-table">
            <thead>
                <tr>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Projects</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team) => (
                    <tr key={team.id}>
                        <td>{team.name}</td>
                        <td>
                            {team.users?.map((user) => (
                                <div key={user.id}>{user.username}</div>
                            ))}
                        </td>
                        <td>
                            {team.projects?.map((project) => (
                                <div key={project.id}>{project.name}</div>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeamTable;
