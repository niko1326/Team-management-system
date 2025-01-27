export enum TaskStatus {
    TODO = 'TODO',
    DONE = 'DONE'
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate?: string;
    projectId: number;
}
