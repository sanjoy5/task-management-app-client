import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Loading from '../components/Loading';

const Main = () => {
    const navigation = useNavigation()
    return (
        <div className='max-w-3xl mx-auto pt-5 px-4'>
            <Navbar />
            <div className="">{navigation.state === 'loading' && <Loading />}</div>
            <Outlet />
        </div>
    );
};

export default Main;