import React, { useEffect, useState, useRef } from 'react';
import { Task, TaskStatus } from '../../types/Task';
import { deleteTask, updateTask, createTask, fetchTasksByProjectId } from '../../services/taskService';
import { FaTrash } from 'react-icons/fa';
import './TaskManager.css';

interface TaskManagerProps {
    projectId: number | null;
    onTaskSelect: (task: Task) => void;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    onTaskUpdate: (task: Task) => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ 
    projectId, 
    onTaskSelect, 
    tasks, 
    setTasks,
    onTaskUpdate 
}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddTask, setShowAddTask] = useState<boolean>(false);
    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const addTaskRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const loadTasks = async () => {
            if (!projectId) {
                setTasks([]);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                console.log('Loading tasks for project:', projectId);
                const fetchedTasks = await fetchTasksByProjectId(projectId);
                console.log('Loaded tasks:', fetchedTasks);
                setTasks(fetchedTasks);
            } catch (err) {
                console.error('Error loading tasks:', err);
                setError(err instanceof Error ? err.message : 'Failed to load tasks');
                setTasks([]);
            } finally {
                setLoading(false);
            }
        };

        loadTasks();
    }, [projectId, setTasks]);

    const handleAddTask = async () => {
        if (!newTaskTitle.trim() || !projectId) return;

        try {
            const newTask = await createTask({
                title: newTaskTitle.trim(),
                projectId: projectId,
            });
            setTasks(prev => [...prev, newTask]);
            setNewTaskTitle('');
            setShowAddTask(false);
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    const handleStatusToggle = async (task: Task, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            const newStatus = task.status === TaskStatus.DONE 
                ? TaskStatus.TODO 
                : TaskStatus.DONE;
            
            const updatedTask = await updateTask(task.id, { ...task, status: newStatus });
            setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
            onTaskUpdate(updatedTask);
        } catch (err) {
            console.error('Error updating task status:', err);
        }
    };

    const handleDeleteTask = async (taskId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(taskId);
                setTasks(prev => prev.filter(task => task.id !== taskId));
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (addTaskRef.current && !addTaskRef.current.contains(event.target as Node)) {
            setShowAddTask(false); // Close the form when clicking outside
        }
    };

    useEffect(() => {
        if (showAddTask) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showAddTask]);

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!projectId) return <div>Please select a project</div>;

    return (
        <div className="task-manager">
            <h2>Tasks</h2>
            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <div className="loading">Loading tasks...</div>
            ) : (
                <div className="task-list">
                    {tasks.map(task => (
                        <div 
                            key={task.id}
                            className={`task-item ${task.status === TaskStatus.DONE ? 'completed' : ''}`}
                            onClick={() => onTaskSelect(task)}
                        >
                            <div className="task-content">
                                <div 
                                    className={`checkbox ${task.status === TaskStatus.DONE ? 'checked' : ''}`}
                                    onClick={(e) => handleStatusToggle(task, e)}
                                >
                                    {task.status === TaskStatus.DONE && '✓'}
                                </div>
                                <div className="task-text">
                                    <h3>{task.title}</h3>
                                    <p className="task-description">{task.description}</p>
                                </div>
                                <button 
                                    className="delete-button"
                                    onClick={(e) => handleDeleteTask(task.id, e)}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <div className="add-task-section" ref={addTaskRef}>
                {showAddTask ? (
                    <form 
                        className="add-task-form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleAddTask();
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Enter task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="task-input"
                            autoFocus
                        />
                        <button type="submit" className="add-button">
                            Add Task
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setShowAddTask(false)} 
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <button onClick={() => setShowAddTask(true)} className="add-task-button">
                        + Add Task
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskManager;
