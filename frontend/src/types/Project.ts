import {Task} from "./Task";

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    teamId: string;
    tasks?: Task[];
    comments?: Comment[];
}
