import axios from 'axios';
import { Comment } from '../types/Comment';

const API_URL = '/api/comments';

// Fetch all comments for a specific project
export const fetchCommentsByProject = async (projectId: string): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/project/${projectId}`);
    return response.data;
};

// Add a new comment to a project
export const addComment = async (commentData: {
    content: string;
    author: string;
    projectId: string;
}): Promise<Comment> => {
    const response = await axios.post(API_URL, commentData);
    return response.data;
};

// Delete a comment by ID
export const deleteComment = async (commentId: string): Promise<void> => {
    await axios.delete(`${API_URL}/${commentId}`);
};

// Edit an existing comment
export const editComment = async (commentId: string, updatedContent: string): Promise<Comment> => {
    const response = await axios.patch(`${API_URL}/${commentId}`, { content: updatedContent });
    return response.data;
};
