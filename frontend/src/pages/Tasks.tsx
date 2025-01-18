import React from 'react';
import TaskTable from '../components/Task/TaskTable';

const Tasks: React.FC = () => {
    return (
        <div className="tasks-container">
            <h1 className="heading">Tasks</h1>
            <TaskTable />
        </div>
    );
};

export default Tasks;
