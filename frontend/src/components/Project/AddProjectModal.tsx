import React, { useState } from 'react';
import { createProject } from '../../services/projectService';
import { Project } from '../../types/Project';

interface AddProjectModalProps {
    onClose: () => void;
    onProjectAdded: (newProject: Project) => void; // Callback to notify the parent of the new project
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ onClose, onProjectAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const newProject = {
                name,
                description,
                status: 'Active', // Default status
            };

            const savedProject = await createProject(newProject); // Save to backend
            onProjectAdded(savedProject); // Notify the parent of the new project
        } catch (err) {
            setError('Failed to create project. Please try again.');
        }
    };

    return (
        <div
            className="modal-backdrop"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: '#1e1e2f',
                    color: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    width: '500px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
            >
                <h2 style={{ marginBottom: '20px', color: 'white' }}>Add Project</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
                            Project Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #444',
                                backgroundColor: '#2e2e40',
                                color: 'white',
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px' }}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '4px',
                                border: '1px solid #444',
                                backgroundColor: '#2e2e40',
                                color: 'white',
                            }}
                            rows={3}
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: '#e74c3c',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#1abc9c',
                                color: 'white',
                                border: 'none',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProjectModal;
