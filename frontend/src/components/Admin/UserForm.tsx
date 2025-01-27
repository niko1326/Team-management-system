import React, { useState } from 'react';
import { User } from '../../types/User';
import { createUser } from '../../services/userService';
import { FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

interface UserFormProps {
    onClose: () => void;
    onUserCreated: (user: User) => void;
    editingUser?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ onClose, onUserCreated, editingUser }) => {
    const [userData, setUserData] = useState({
        username: editingUser?.username || '',
        email: editingUser?.email || '',
        password: '',
        isAdmin: editingUser?.isAdmin || false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newUser = await createUser(userData);
            onUserCreated(newUser);
            onClose();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="task-details">
            <div className="task-details-content">
                <button className="close-button" onClick={onClose}><FaTimes /></button>
                <h2>{editingUser ? 'Edit User' : 'Create New User'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({...userData, username: e.target.value})}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            required
                        />
                    </div>
                    {!editingUser && (
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={userData.password}
                                onChange={(e) => setUserData({...userData, password: e.target.value})}
                                required
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={userData.isAdmin}
                                onChange={(e) => setUserData({...userData, isAdmin: e.target.checked})}
                            />
                            Admin Privileges
                        </label>
                    </div>
                    <div className="button-group">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">
                            {editingUser ? 'Update User' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm; 