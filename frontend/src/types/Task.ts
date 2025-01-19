export interface Task {
    id: number; // Task ID
    title: string; // Title of the task
    description: string; // Description of the task
    status: 'IN_PROGRESS' | 'COMPLETE'; // Status with predefined values
    dueDate: string; // Due date as an ISO string
}
