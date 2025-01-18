import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css'; // Import your styles

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h1 className="heading">Dashboard</h1>
            <div className="stats-cards">
                <div className="stat-card">
                    <h2>Projects</h2>
                    <p>View and manage all projects.</p>
                    <Link to="/projects" className="view-link">View Projects</Link>
                </div>
                <div className="stat-card">
                    <h2>Tasks</h2>
                    <p>Track and manage tasks.</p>
                    <Link to="/tasks" className="view-link">View Tasks</Link>
                </div>
                <div className="stat-card">
                    <h2>Teams</h2>
                    <p>Manage your teams.</p>
                    <Link to="/teams" className="view-link">View Teams</Link>
                </div>
                <div className="stat-card">
                    <h2>Comments</h2>
                    <p>Collaborate on projects.</p>
                    <Link to="/comments" className="view-link">View Comments</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
