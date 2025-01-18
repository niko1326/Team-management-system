import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats">
                <div className="stat-card">Projects: 10</div>
                <div className="stat-card">Tasks: 50</div>
                <div className="stat-card">Teams: 5</div>
                <div className="stat-card">Comments: 20</div>
            </div>
        </div>
    );
};

export default Dashboard;
