import React from 'react';
import { Task } from '../../types/Task';

interface TaskDetailsProps {
    task: Task | null;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
    if (!task) {
        return <div style={{ flex: 0.4, padding: '20px', backgroundColor: '#f9f9f9' }}>Select a task to see details</div>;
    }

    return (
        <div
            className="task-details"
            style={{
                flex: 0.4,
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderLeft: '1px solid #ddd',
            }}
        >
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Task Details</h2>
            <p>
                <strong>Title:</strong> {task.title}
            </p>
            <p>
                <strong>Description:</strong> {task.description}
            </p>
            <p>
                <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <div>
                <h3>Comments</h3>
                {/* Add comments section */}
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>No comments available</li>
                </ul>
            </div>
        </div>
    );
};

export default TaskDetails;
