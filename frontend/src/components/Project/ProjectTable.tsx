import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
    id: string;
    name: string;
    description: string;
    status: string;
}

interface ProjectTableProps {
    projects: Project[];
}

const ProjectTable: React.FC<ProjectTableProps> = ({ projects }) => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => (
                <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td>{project.status}</td>
                    <td>
                        <Link to={`/projects/${project.id}`} className="btn btn-primary">
                            View
                        </Link>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ProjectTable;
