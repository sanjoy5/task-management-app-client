import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (

        <nav className='flex justify-between items-center bg-slate-800 px-8 py-4'>
            <Link className='text-white font-bold text-xl' to={'/'}>TaskApp</Link>
            <div className="">
                <Link className='bg-white py-2 px-4 rounded font-semibold ml-2' to={'/login'}>Login</Link>
            </div>
        </nav>
    );
};

export default Navbar;