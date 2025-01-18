import api from './apiConfig';
import { Comment } from '../types/Comment';

// Fetch all comments for a specific project
export const fetchCommentsByProject = async (projectId: string): Promise<Comment[]> => {
    const response = await api.get(`/comments/project/${projectId}`);
    return response.data;
};

// Add a new comment
export const addComment = async (commentData: {
    content: string;
    author: string;
    projectId: string;
}): Promise<Comment> => {
    const response = await api.post('/comments', commentData);
    return response.data;
};

// Delete a comment by ID
export const deleteComment = async (commentId: string): Promise<void> => {
    await api.delete(`/comments/${commentId}`);
};

// Edit a comment
export const editComment = async (commentId: string, updatedContent: string): Promise<Comment> => {
    const response = await api.patch(`/comments/${commentId}`, { content: updatedContent });
    return response.data;
};
