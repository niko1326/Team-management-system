import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetail from '../components/Project/ProjectDetail';

const ProjectDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <div className="project-detail-page">
            <h1 className="heading">Project Detail</h1>
            <ProjectDetail projectId={id} />
        </div>
    );
};

export default ProjectDetailPage;
