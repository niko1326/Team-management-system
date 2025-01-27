import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ProjectSidebar from '../Project/ProjectSidebar';
import TaskManager from '../Task/TaskManager';
import TaskDetails from '../Task/TaskDetails';
import ProjectDetails from '../Project/ProjectDetails';
import ProjectForm from '../Project/ProjectForm';
import { Project } from '../../types/Project';
import { Task } from '../../types/Task';
import { fetchProjects } from '../../services/projectService';
import { fetchTasksByProjectId } from '../../services/taskService';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showProjectForm, setShowProjectForm] = useState(false);

    const loadProjects = async () => {
        try {
            setLoading(true);
            if (user?.username) {
                const projectsData = await fetchProjects(user.username);
                setProjects(projectsData);
            }
        } catch (err) {
            setError('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [user]);

    // Fetch tasks when selected project changes
    useEffect(() => {
        if (selectedProjectId) {
            loadTasks(selectedProjectId);
        } else {
            setTasks([]);
        }
    }, [selectedProjectId]);

    const loadTasks = async (projectId: number) => {
        try {
            const fetchedTasks = await fetchTasksByProjectId(projectId);
            setTasks(fetchedTasks);
            setError(null);
        } catch (err) {
            console.error('Error loading tasks:', err);
            setError('Failed to load tasks');
            setTasks([]);
        }
    };

    const handleProjectSelect = (projectId: number | null) => {
        setSelectedProjectId(projectId);
        setSelectedTask(null);
        setEditingProject(null);
        
        if (projectId) {
            loadTasks(projectId);
        } else {
            setTasks([]);
        }
    };

    const handleProjectUpdate = async (updatedProject: Project) => {
        setProjects(prev => 
            prev.map(p => p.id === updatedProject.id ? updatedProject : p)
        );
        setEditingProject(null);
        await loadProjects(); // Refresh projects after update
    };

    const handleTaskUpdate = async (updatedTask: Task) => {
        setTasks(prev => 
            prev.map(task => task.id === updatedTask.id ? updatedTask : task)
        );
        if (selectedTask?.id === updatedTask.id) {
            setSelectedTask(updatedTask);
        }
        if (selectedProjectId) {
            await loadTasks(selectedProjectId); // Refresh tasks after update
        }
    };

    const handleAddProject = () => {
        setSelectedTask(null);
        setEditingProject(null);
        setShowProjectForm(true);
    };

    const handleProjectCreated = (newProject: Project) => {
        setProjects(prev => [...prev, newProject]);
        setShowProjectForm(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Team Management System</h1>
                <div className="user-info">
                    <span>Welcome, {user?.username || 'User'}</span>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>
            <div className="dashboard-content">
                <ProjectSidebar
                    projects={projects}
                    selectedProjectId={selectedProjectId}
                    onProjectSelect={handleProjectSelect}
                    setProjects={setProjects}
                    onEditProject={(project) => {
                        setSelectedTask(null);
                        setEditingProject(project);
                    }}
                    onAddProject={handleAddProject}
                />
                <div className="main-content">
                    <TaskManager
                        projectId={selectedProjectId}
                        tasks={tasks}
                        setTasks={setTasks}
                        onTaskSelect={setSelectedTask}
                        onTaskUpdate={handleTaskUpdate}
                    />
                    {(selectedTask || editingProject || showProjectForm) && (
                        showProjectForm ? (
                            <ProjectForm
                                onClose={() => setShowProjectForm(false)}
                                onProjectCreated={handleProjectCreated}
                            />
                        ) : editingProject ? (
                            <ProjectDetails
                                project={editingProject}
                                onClose={() => setEditingProject(null)}
                                onUpdate={handleProjectUpdate}
                            />
                        ) : (
                            <TaskDetails
                                task={selectedTask!}
                                onClose={() => setSelectedTask(null)}
                                onUpdate={handleTaskUpdate}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 