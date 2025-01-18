import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/taskService'; // Ensure this matches your actual service path
import '../../styles/styles.css'; // Import your styles

const NewTaskForm: React.FC = () => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('Pending');
    const [projectId, setProjectId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const newTask = {
                name,
                status,
                projectId,
            };

            await createTask(newTask); // API call to save the task
            navigate(`/projects/${projectId}`); // Redirect to the associated project
        } catch (err) {
            setError('Failed to create task. Please try again.');
        }
    };

    return (
        <div className="new-task-form-container">
            <h1 className="heading">Create New Task</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="name">Task Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter task name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="In Progress">In Progress</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project ID</label>
                    <input
                        type="text"
                        id="project"
                        value={projectId}
                        onChange={(e) => setProjectId(e.target.value)}
                        placeholder="Enter project ID"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default NewTaskForm;
