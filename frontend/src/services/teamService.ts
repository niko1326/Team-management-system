import api from './apiConfig';
import { Team } from '../types/Team';

// Fetch all teams
export const fetchTeams = async (): Promise<Team[]> => {
    const response = await api.get('/teams');

    // Transform to include members from USER_TEAMS
    const teamsWithMembers = await Promise.all(
        response.data.map(async (team: Team) => {
            const membersResponse = await api.get(`/teams/${team.id}/members`);
            return {
                ...team,
                members: membersResponse.data, // Populate members from the API
            };
        })
    );

    return teamsWithMembers;
};

// Fetch a single team by ID
export const fetchTeamById = async (teamId: string): Promise<Team> => {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
};

// Add a new team
export const createTeam = async (teamData: {
    name: string;
    description: string;
}): Promise<Team> => {
    const response = await api.post('/teams', teamData);
    return response.data;
};

// Delete a team by ID
export const deleteTeam = async (teamId: string): Promise<void> => {
    await api.delete(`/teams/${teamId}`);
};
