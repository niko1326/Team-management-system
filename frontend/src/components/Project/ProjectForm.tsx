import React, { useState } from 'react';
import { Project } from '../../types/Project';
import { createProject } from '../../services/projectService';
import '../Task/TaskDetails.css';

interface ProjectFormProps {
    onClose: () => void;
    onProjectCreated: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onClose, onProjectCreated }) => {
    const [newProject, setNewProject] = useState<Partial<Project>>({
        name: '',
        description: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdProject = await createProject(newProject);
            onProjectCreated(createdProject);
            onClose();
        } catch (err) {
            setError('Failed to create project');
            console.error('Error creating project:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="task-details">
            <div className="task-details-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Add New Project</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={newProject.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={newProject.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Create Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm; 