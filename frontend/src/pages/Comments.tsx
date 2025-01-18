import React, { useState, useEffect } from 'react';
import CommentList from '../components/Comment/CommentList';
import { fetchCommentsByProject } from '../services/commentService';
import { Comment } from '../types/Comment';

const Comments: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]); // Explicit type added
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const fetchedComments = await fetchCommentsByProject('project123'); // Replace with dynamic project ID
                setComments(fetchedComments);
            } catch (error) {
                console.error('Failed to load comments:', error);
            } finally {
                setLoading(false);
            }
        };

        loadComments();
    }, []);

    if (loading) return <p>Loading comments...</p>;

    return (
        <div className="comments-container">
            <h1 className="heading">Comments</h1>
            <CommentList comments={comments} />
        </div>
    );
};

export default Comments;
