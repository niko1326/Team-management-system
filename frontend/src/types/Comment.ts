import { Task } from './Task';
import { Project } from './Project';

export interface Comment {
    id: number;
    content: string;
    createdAt: string;
    task?: Task;
    project?: Project;
    username?: string;
}
