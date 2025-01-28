import React, { useState } from 'react';
import { User } from '../../types/User';
import { createUser, updateUser } from '../../services/userService';
import { FaTimes } from 'react-icons/fa';
import './AdminDashboard.css';

interface UserFormProps {
    teamId: number;
    onClose: () => void;
    onUserCreated: (user: User) => void;
    editingUser?: User | null;
}

const UserForm: React.FC<UserFormProps> = ({ teamId, onClose, onUserCreated, editingUser }) => {
    const [userData, setUserData] = useState({
        username: editingUser?.username || '',
        email: editingUser?.email || '',
        password: '',
        isAdmin: editingUser?.isAdmin || false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let user;
            if (editingUser) {
                const updates: Partial<User> = {
                    username: userData.username,
                    email: userData.email,
                    isAdmin: userData.isAdmin,
                };
                if (isChangingPassword && userData.password) {
                    updates.password = userData.password;
                }
                user = await updateUser(editingUser.id, updates);
            } else {
                user = await createUser(userData);
            }
            onUserCreated(user);
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
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
                    <div className="form-group">
                        {editingUser ? (
                            <div className="password-section">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isChangingPassword}
                                        onChange={(e) => setIsChangingPassword(e.target.checked)}
                                    />
                                    Change Password
                                </label>
                                {isChangingPassword && (
                                    <div className="password-input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={userData.password}
                                            onChange={(e) => setUserData({...userData, password: e.target.value})}
                                            placeholder="New password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="toggle-password"
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="password-input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={userData.password}
                                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="toggle-password"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        )}
                    </div>
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