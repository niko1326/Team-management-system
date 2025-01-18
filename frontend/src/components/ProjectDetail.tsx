import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the stylesheet

interface Task {
    id: string;
    name: string;
    status: string;
}

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
    tasks: Task[];
}

interface ProjectDetailProps {
    projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
    const { id } = useParams<{ id: string }>();
    const project = projects.find((p) => p.id === id);

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="project-detail-container">
            <h1 className="project-name">{project.name}</h1>
            <p className="project-description">{project.description}</p>
            <span className={`status-badge status-${project.status.toLowerCase()}`}>{project.status}</span>

            <h2 className="tasks-heading">Tasks</h2>
            <ul className="tasks-list">
                {project.tasks?.map((task) => (
                    <li key={task.id} className={`task-item task-${task.status.toLowerCase()}`}>
                        <span className="task-name">{task.name}</span>
                        <span className={`task-status task-${task.status.toLowerCase()}`}>{task.status}</span>
                    </li>
                ))}
            </ul>

            <Link to="/projects" className="back-link">Back to Projects</Link>
        </div>
    );
};

export default ProjectDetail;
