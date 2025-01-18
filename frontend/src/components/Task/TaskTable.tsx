import React from 'react';
import { Link } from 'react-router-dom';

interface Task {
    id: string;
    name: string;
    status: string;
    projectId: string;
}

interface TaskTableProps {
    tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {tasks.map((task) => (
                <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.status}</td>
                    <td>
                        <Link to={`/tasks/${task.id}`} className="btn btn-primary">
                            View
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TaskTable;
