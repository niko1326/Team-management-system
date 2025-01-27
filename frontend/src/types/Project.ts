import { Task } from './Task';
import { Team } from './Team';

export interface Project {
    id: number;
    name: string;
    description: string;
    team?: Team;
}
