import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa';

const MyTasks = ({ task, handleDelete }) => {
    return (
        <>
            <div className="border-b py-3 last:border-b-0">
                <div className="grid grid-cols-5 gap-5">
                    <div className="col-span-4">
                        <h2 className="text-xl font-medium  text-slate-800">{task?.title}</h2>
                        <p className=" text-gray-600 mt-2">{task?.description}</p>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                        <Link to={`/updatetask/${task?._id}`} className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                            <FaPen className='text-lg text-green-500' />
                        </Link>
                        <div onClick={() => handleDelete(task?._id)} className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                            <FaTrash className='text-lg text-red-500' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyTasks;