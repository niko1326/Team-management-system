import React from 'react';

interface TaskCardProps {
    name: string;
    status: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ name, status }) => {
    return (
        <div className="task-card">
            <h4>{name}</h4>
            <span className={`task-status ${status.toLowerCase()}`}>{status}</span>
        </div>
    );
};

export default TaskCard;
