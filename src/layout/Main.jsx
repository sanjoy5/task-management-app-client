import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';

const Main = () => {
    return (
        <div className='max-w-7xl mx-auto pt-5 px-4'>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Main;