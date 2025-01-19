import React, { useEffect, useState } from 'react';
import { Task } from '../../types/Task';
import { fetchTasksByProjectId, updateTask } from '../../services/taskService';

interface TaskManagerProps {
    projectId: number | null;
    onTaskSelect: (task: Task) => void; // Pass selected task to parent
}

const TaskManager: React.FC<TaskManagerProps> = ({ projectId, onTaskSelect }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (projectId === null) {
            setTasks([]);
            setLoading(false);
            return;
        }

        const getTasks = async () => {
            setLoading(true);
            try {
                const data = await fetchTasksByProjectId(projectId);
                setTasks(data);
            } catch (err) {
                console.error('Failed to fetch tasks', err);
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, [projectId]);

    const toggleTaskStatus = async (taskId: number, currentStatus: string) => {
        const newStatus = currentStatus === 'COMPLETE' ? 'IN_PROGRESS' : 'COMPLETE';
        try {
            const updatedTask = await updateTask(taskId, { status: newStatus });
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, status: updatedTask.status } : task
                )
            );
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <div
            className="task-manager"
            style={{
                flex: 1,
                padding: '20px',
                backgroundColor: 'white',
                overflowY: 'auto',
                height: '100%',
            }}
        >
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Tasks</h2>
            {tasks.length === 0 ? (
                <p>No tasks available for this project.</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {tasks.map((task) => (
                        <li
                            key={task.id}
                            style={{
                                padding: '15px',
                                marginBottom: '15px',
                                backgroundColor: '#ecf0f1',
                                borderRadius: '5px',
                                border: '1px solid #bdc3c7',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                            }}
                            onClick={() => onTaskSelect(task)}
                        >
                            <div>
                                <strong>{task.title}</strong>
                                <p style={{ margin: 0, color: '#7f8c8d' }}>{task.description}</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={task.status === 'COMPLETE'}
                                onChange={() => toggleTaskStatus(task.id, task.status)}
                                style={{ width: '20px', height: '20px' }}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskManager;
