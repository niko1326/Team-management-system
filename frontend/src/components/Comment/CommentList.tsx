import React from 'react';
import { Comment } from '../../types/Comment';
import './CommentList.css';

interface CommentListProps {
    comments: Comment[];
    onDelete?: (commentId: number) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
    if (!comments || comments.length === 0) {
        return <div className="no-comments">No comments yet</div>;
    }

    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-header">
                        <span className="comment-author">{comment.username || 'Anonymous'}</span>
                        <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleString()}
                        </span>
                    </div>
                    <div className="comment-content">{comment.content}</div>
                    {onDelete && (
                        <button 
                            onClick={() => onDelete(comment.id)}
                            className="delete-comment"
                        >
                            Delete
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentList; 