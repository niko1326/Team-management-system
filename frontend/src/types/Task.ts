export interface Task {
    id: string;
    name: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    projectId: string;
}
