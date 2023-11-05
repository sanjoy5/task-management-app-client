import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useAuthContext()

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'center-center',
                    icon: 'success',
                    title: 'User Logout Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => console.log(error.message))
    }

    return (

        <nav className='flex justify-between items-center bg-slate-800 px-8 py-4'>
            <Link className='text-white font-bold text-xl' to={'/'}>TaskApp</Link>
            {
                user ? <>
                    <div className="">
                        <div onClick={handleLogout} className='bg-white py-2 px-4 rounded font-semibold ml-2 cursor-pointer'>Logout</div>
                    </div>
                </> : <>
                    <div className="">
                        <Link className='bg-white py-2 px-4 rounded font-semibold ml-2' to={'/login'}>Login</Link>
                    </div>
                </>
            }

        </nav>
    );
};

export default Navbar;