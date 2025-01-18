import React from 'react';
import CommentList from '../components/Comment/CommentList';

const Comments: React.FC = () => {
    return (
        <div className="comments-container">
            <h1 className="heading">Comments</h1>
            <CommentList />
        </div>
    );
};

export default Comments;
