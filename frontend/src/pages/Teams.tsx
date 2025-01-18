import React from 'react';
import TeamTable from '../components/Team/TeamTable';

const Teams: React.FC = () => {
    return (
        <div className="teams-container">
            <h1 className="heading">Teams</h1>
            <TeamTable />
        </div>
    );
};

export default Teams;
