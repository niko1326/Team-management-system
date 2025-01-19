import React, { useState, useEffect } from 'react';
import ProjectSidebar from './components/Project/ProjectSidebar';
import TaskManager from './components/Task/TaskManager';
import TaskDetails from './components/Task/TaskDetails';
import { fetchProjects } from './services/projectService';
import { Project } from './types/Project';
import { Task } from './types/Task';

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
            if (data.length > 0) {
                setSelectedProjectId(data[0].id); // Select the first project by default
            }
        };
        getProjects();
    }, []);

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            <ProjectSidebar
                projects={projects}
                setProjects={setProjects} // Pass setProjects function to update projects dynamically
                onSelectProject={(id) => {
                    setSelectedProjectId(id);
                    setSelectedTask(null); // Reset selected task
                }}
                selectedProjectId={selectedProjectId}
            />
            <TaskManager
                projectId={selectedProjectId}
                onTaskSelect={(task) => setSelectedTask(task)}
            />
            <TaskDetails task={selectedTask} />
        </div>
    );
};

export default App;
