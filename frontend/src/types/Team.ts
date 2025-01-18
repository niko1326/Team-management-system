export interface Team {
    id: string;
    name: string;
    description: string;
    members: { id: string; username: string; email: string }[]; // Represents members in the team
    projects?: { id: string; name: string }[]; // Optional projects linked to the team
}
