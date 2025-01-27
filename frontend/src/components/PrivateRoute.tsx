import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute; 