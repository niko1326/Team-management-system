import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../../types/Project';
import AddProjectModal from './AddProjectModal';
import { deleteProject, updateProject } from '../../services/projectService';

interface ProjectSidebarProps {
    projects: Project[];
    selectedProjectId: number | null;
    onSelectProject: (id: number) => void;
    setProjects: (projects: Project[]) => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({ projects, selectedProjectId, onSelectProject, setProjects }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown menu when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setMenuOpenId(null);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleAddProjectClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleEditProjectClick = (project: Project) => {
        setEditingProject(project);
        setEditModalOpen(true);
        setMenuOpenId(null); // Close the dropdown
    };

    const handleEditProjectSave = async (updatedProject: Project) => {
        try {
            const savedProject = await updateProject(updatedProject.id, updatedProject);
            setProjects(projects.map((project) => (project.id === savedProject.id ? savedProject : project))); // Update the project in the list
            setEditModalOpen(false); // Close the edit modal
        } catch (error) {
            console.error('Failed to update project:', error);
            alert('An error occurred while saving the project. Please try again.');
        }
    };

    const handleDeleteProject = async (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this project?');
        if (confirmed) {
            try {
                await deleteProject(id); // Call the API to delete the project from the database
                setProjects(projects.filter((project) => project.id !== id)); // Remove the project from the frontend
            } catch (error) {
                console.error('Failed to delete the project:', error);
                alert('An error occurred while deleting the project. Please try again.');
            }
        }
    };

    const toggleMenu = (id: number) => {
        setMenuOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <div
            className="project-sidebar"
            style={{
                width: '20%',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px',
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
                overflowY: 'auto',
                height: '100%',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', borderBottom: '1px solid #34495e', paddingBottom: '10px' }}>
                    Projects
                </h2>
                <button
                    onClick={handleAddProjectClick}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                >
                    +
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className={selectedProjectId === project.id ? 'selected' : ''}
                        style={{
                            padding: '10px 15px',
                            marginBottom: '10px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            backgroundColor: selectedProjectId === project.id ? '#1abc9c' : '#34495e',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <span onClick={() => onSelectProject(project.id)}>{project.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering project selection
                                toggleMenu(project.id);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                            }}
                        >
                            &#x22EE; {/* Three dots icon */}
                        </button>
                        {menuOpenId === project.id && (
                            <div
                                ref={dropdownRef}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '40px',
                                    backgroundColor: '#2e2e40',
                                    color: 'white',
                                    borderRadius: '5px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                    zIndex: 100,
                                    width: '150px',
                                }}
                            >
                                <button
                                    onClick={() => handleEditProjectClick(project)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '10px',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #444',
                                    }}
                                >
                                    Edit Project
                                </button>
                                <button
                                    onClick={() => handleDeleteProject(project.id)}
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        padding: '10px',
                                        textAlign: 'left',
                                        background: 'none',
                                        border: 'none',
                                        color: 'red',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete Project
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {isModalOpen && <AddProjectModal onClose={handleCloseModal} onProjectAdded={(project) => setProjects([...projects, project])} />}
            {isEditModalOpen && editingProject && (
                <AddProjectModal
                    onClose={() => setEditModalOpen(false)}
                    onProjectAdded={(project) => handleEditProjectSave({ ...editingProject, ...project })}
                />
            )}
        </div>
    );
};

export default ProjectSidebar;
