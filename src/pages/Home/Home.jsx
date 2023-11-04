import React from 'react';
import Tasks from '../../components/Tasks/Tasks';
import AddTask from '../../components/Tasks/AddTask';

const Home = () => {
    return (
        <>
            <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                <div className=" mt-6 rounded lg:w-2/5  h-fit">
                    <div className="flex items-center justify-center flex-col bg-white p-8 mb-6">
                        <h2 className='text-2xl'>Welcome <span className="font-medium">Guest !</span></h2>
                        <p className="text-lg text-gray-500">Have a nice day !</p>
                    </div>
                    <AddTask />

                </div>
                <div className="flex-1">
                    <Tasks />
                </div>
            </div>

        </>
    );
};

export default Home;