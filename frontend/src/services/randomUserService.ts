import axios from 'axios';

interface RandomUserApiResponse {
  results: [{
    login: {
      username: string;
    };
    email: string;
    name: {
      first: string;
      last: string;
    };
  }];
}

export const generateRandomUser = async () => {
  try {
    const response = await axios.get<RandomUserApiResponse>(
      'https://randomuser.me/api/?nat=us'  // Get US-format names
    );
    
    const randomUser = response.data.results[0];
    
    return {
      username: randomUser.login.username,
      email: randomUser.email,
      password: 'Password123!', // Default secure password
      isAdmin: false,  // Default to non-admin user
      firstName: randomUser.name.first,
      lastName: randomUser.name.last
    };
  } catch (error) {
    console.error('Error fetching random user:', error);
    throw error;
  }
}; 