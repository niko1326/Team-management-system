import React from 'react';
import { Link } from 'react-router-dom';

interface Team {
    id: string;
    name: string;
    description: string;
    members: number;
}

interface TeamTableProps {
    teams: Team[];
    onEdit?: (team: Team) => void; // Optional edit callback
    onDelete?: (id: string) => void; // Optional delete callback
}

const TeamTable: React.FC<TeamTableProps> = ({ teams, onEdit, onDelete }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Members</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
                <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.description}</td>
                    <td>{team.members}</td>
                    <td>
                        <Link to={`/teams/${team.id}`} className="btn btn-primary">
                            View
                        </Link>
                        {onEdit && (
                            <button
                                className="btn btn-secondary"
                                onClick={() => onEdit(team)}
                            >
                                Edit
                            </button>
                        )}
                        {onDelete && (
                            <button
                                className="btn btn-danger"
                                onClick={() => onDelete(team.id)}
                            >
                                Delete
                            </button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TeamTable;
