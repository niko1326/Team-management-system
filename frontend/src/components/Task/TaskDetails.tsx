import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../../types/Task';
import { updateTask } from '../../services/taskService';
import './TaskDetails.css';

interface TaskDetailsProps {
    task: Task;
    onClose: () => void;
    onUpdate: (updatedTask: Task) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose, onUpdate }) => {
    const [editedTask, setEditedTask] = useState<Task>(task);
    const [error, setError] = useState<string | null>(null);

    // Add this useEffect to update the form when the task prop changes
    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedTask = await updateTask(task.id, editedTask);
            onUpdate(updatedTask);
        } catch (err) {
            setError('Failed to update task');
            console.error('Error updating task:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="task-details">
            <div className="task-details-header">
                <h2>Task Details</h2>
                <button onClick={onClose} className="close-button">×</button>
            </div>
            <div className="task-details-content">
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={editedTask.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedTask.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Status:</label>
                        <select
                            id="status"
                            name="status"
                            value={editedTask.status}
                            onChange={handleChange}
                        >
                            {Object.values(TaskStatus).map(status => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            name="dueDate"
                            value={editedTask.dueDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskDetails;
