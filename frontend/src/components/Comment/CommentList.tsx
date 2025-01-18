import React from 'react';

interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: string;
}

interface CommentListProps {
    comments: Comment[];
    onDelete?: (id: string) => void; // Optional delete callback
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
    return (
        <div className="comment-list-container">
            <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments available.</p>
            ) : (
                <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-item">
                            <p>{comment.content}</p>
                            <div className="comment-meta">
                                <span>By: {comment.author}</span>
                                <span> | </span>
                                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                            </div>
                            {onDelete && (
                                <button
                                    className="delete-button"
                                    onClick={() => onDelete(comment.id)}
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CommentList;
