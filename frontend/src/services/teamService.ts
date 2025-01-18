import axios from 'axios';

const API_URL = '/api/teams';

export const createTeam = async (teamData: {
    name: string;
    description: string;
}) => {
    return axios.post(API_URL, teamData);
};
