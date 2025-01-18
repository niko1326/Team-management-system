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
                <th>Description</th>
                <th>Members</th>
            </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
                <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                    <td>
                        {team.members.map((member) => (
                            <div key={member.id}>
                                {member.username} ({member.email})
                            </div>
                        ))}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TeamTable;
