import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useAuthContext } from '../provider/AuthProvider';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuthContext()
    const location = useLocation()

    // if (loading) {
    //     return <Loading />
    // }
    if (user) {
        return children
    } else {

        Swal.fire({
            title: 'Opps!',
            text: 'You Have to Login First to See This Page',
            // icon: 'error',
            confirmButtonText: 'Cool'
        })

        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

};

export default PrivateRoute;