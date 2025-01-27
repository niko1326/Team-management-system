import { TeamUser } from './User';

export interface Team {
    id: number;
    name: string;
    users: TeamUser[];
    projects: {
        id: number;
        name: string;
        description: string;
    }[];
}
