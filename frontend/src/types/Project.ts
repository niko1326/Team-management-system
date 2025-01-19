import { Task } from './Task';
import { Team } from './Team';

export interface Project {
    id: number;
    name: string;
    description: string;
    startDate: string; // Using string to represent dates from the backend
    endDate: string;
    team?: Team; // Optional as it can be null
    tasks?: Task[]; // Optional to account for potential absence
}
