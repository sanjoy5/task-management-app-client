import React from 'react';
import Tasks from '../components/Tasks/Tasks';
import AddTask from '../components/Tasks/AddTask';
import { useAuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuthContext()

    return (
        <>
            <div className='flex flex-col  gap-6 mb-8'>
                <div className=" mt-6 rounded w-full  h-fit">
                    <div className="flex items-center justify-center flex-col bg-white p-8">
                        <h2 className='text-2xl'>Welcome {user ? <span className="font-medium">  {user.displayName} !</span> : <span className="font-medium">  Guest !</span>} </h2>
                        <p className="text-lg text-gray-500">Have a nice day !</p>
                    </div>

                </div>
                <Link className='bg-slate-800 hover:bg-slate-900 text-white text-center py-2 px-4 rounded font-semibold' to={'/addtask'}>Add Task</Link>
                <Tasks />

                {
                    !user && <p className="pt-4 text-center text-amber-500">Warning: You have to <Link to="/login" className="text-blue-500 underline">Login</Link> first for Add a Task.</p>
                }

            </div>

        </>
    );
};

export default Home;