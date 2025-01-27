import React, { useState } from 'react';
import { User } from '../../types/User';

interface UserCardProps {
    user: User;
    teamId: number;
    onUserUpdate: (userId: number, updates: Partial<User>) => Promise<void>;
    onUserAssignment: (userId: number, checked: boolean) => Promise<void>;
}

const UserCard: React.FC<UserCardProps> = ({ user, teamId, onUserUpdate, onUserAssignment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onUserUpdate(user.id, {
                username: editedUser.username,
                email: editedUser.email,
                isAdmin: editedUser.isAdmin
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="user-card">
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editedUser.username}
                        onChange={(e) => setEditedUser({...editedUser, username: e.target.value})}
                    />
                    <input
                        type="email"
                        value={editedUser.email}
                        onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={editedUser.isAdmin}
                            onChange={(e) => setEditedUser({...editedUser, isAdmin: e.target.checked})}
                        />
                        Admin
                    </label>
                    <div>
                        <button type="submit">Save</button>
                        <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <div className="user-info">
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                    {user.isAdmin && <span className="admin-badge">Admin</span>}
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default UserCard;