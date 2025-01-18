import {Project} from "./Project";

export interface Team {
    id: string;
    name: string;
    description: string;
    projects?: Project[];
}
