import React from 'react';
import { Project } from '../../types/Project';
import { deleteProject } from '../../services/projectService';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import './ProjectSidebar.css';

interface ProjectSidebarProps {
    projects: Project[];
    selectedProjectId: number | null;
    onProjectSelect: (projectId: number | null) => void;
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    onEditProject: (project: Project) => void;
    onAddProject?: () => void;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
    projects,
    selectedProjectId,
    onProjectSelect,
    setProjects,
    onEditProject,
    onAddProject
}) => {
    const handleDeleteProject = async (projectId: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteProject(projectId);
                setProjects(prev => prev.filter(project => project.id !== projectId));
                if (selectedProjectId === projectId) {
                    onProjectSelect(null);
                }
            } catch (err) {
                console.error('Error deleting project:', err);
            }
        }
    };

    return (
        <div className="project-sidebar">
            <div className="project-header">
                <h2>Projects</h2>
                <button 
                    className="add-project-button"
                    onClick={onAddProject}
                    title="Add new project"
                >
                    <FaPlus />
                </button>
            </div>
            <div className="project-list">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className={`project-item ${project.id === selectedProjectId ? 'selected' : ''}`}
                        onClick={() => onProjectSelect(project.id)}
                    >
                        <div className="project-content">
                            <div className="project-text">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                            </div>
                            <button 
                                className="edit-button action-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEditProject(project);
                                }}
                            >
                                <FaEdit />
                            </button>
                            <button 
                                className="delete-button action-button"
                                onClick={(e) => handleDeleteProject(project.id, e)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;
