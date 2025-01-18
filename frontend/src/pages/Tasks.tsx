import React, { useState, useEffect } from 'react';
import TaskTable from '../components/Task/TaskTable';
import { fetchTasks } from '../services/taskService';
import { Task } from '../types/Task';

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]); // Explicit type added
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTasks = async () => {
            try {
                const fetchedTasks = await fetchTasks();
                setTasks(fetchedTasks);
            } catch (error) {
                console.error('Failed to load tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, []);

    if (loading) return <p>Loading tasks...</p>;

    return (
        <div className="tasks-container">
            <h1 className="heading">Tasks</h1>
            <TaskTable tasks={tasks} />
        </div>
    );
};

export default Tasks;
