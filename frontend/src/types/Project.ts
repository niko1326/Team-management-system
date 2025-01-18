import { Task } from './Task';
import { Comment } from './Comment';

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    teamId: string;
    tasks: Task[]; // Ensure tasks is always defined
    comments?: Comment[];
}
