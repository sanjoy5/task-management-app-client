import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { useAuthContext } from '../provider/AuthProvider';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthContext()
    const location = useLocation()

    if (loading) {
        return <Loading />
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default PrivateRoute;