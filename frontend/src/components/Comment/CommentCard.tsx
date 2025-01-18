import React from 'react';

interface CommentCardProps {
    content: string;
    author: string;
    timestamp: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ content, author, timestamp }) => {
    return (
        <div className="comment-card">
            <p>{content}</p>
            <div>
                <span>{author}</span> | <span>{timestamp}</span>
            </div>
        </div>
    );
};

export default CommentCard;
