import React from 'react';

interface TeamCardProps {
    name: string;
    description: string;
    members: number;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, description, members }) => {
    return (
        <div className="team-card">
            <h3>{name}</h3>
            <p>{description}</p>
            <span>{members} Members</span>
        </div>
    );
};

export default TeamCard;
