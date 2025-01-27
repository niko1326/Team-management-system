import React, { useState, useEffect } from 'react';
import { Project } from '../../types/Project';
import { updateProject } from '../../services/projectService';
import '../Task/TaskDetails.css';

interface ProjectDetailsProps {
    project: Project;
    onClose: () => void;
    onUpdate: (project: Project) => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onClose, onUpdate }) => {
    const [editedProject, setEditedProject] = useState<Project>(project);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setEditedProject(project);
    }, [project]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatedProject = await updateProject(project.id, editedProject);
            onUpdate(updatedProject);
        } catch (err) {
            setError('Failed to update project');
            console.error('Error updating project:', err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedProject(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="task-details">
            <div className="task-details-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Edit Project</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={editedProject.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={editedProject.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProjectDetails; 