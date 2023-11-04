import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const Tasks = () => {
    return (
        <>
            {/* <h3 className="text-xl font-semibold px-6 py-3 w-fit  border-b-2 border-slate-800 mx-auto">All Tasks</h3> */}
            <div className="bg-white shadow p-8 rounded lg:mt-6 last:">
                {/* <h2 className='text-2xl font-medium uppercase text-red-500'>There is no tasks available !!!</h2> */}

                <div className="border-b py-3 last:border-b-0">
                    <div className="grid grid-cols-5 gap-5">
                        <div className="col-span-4">
                            <h2 className="text-xl font-medium uppercase text-slate-800">Web Development</h2>
                            <p className=" text-gray-600 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, eius. lorem52</p>
                        </div>

                        <div className="flex gap-2 items-center justify-center">
                            <div className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                <FaPen className='text-lg text-green-500' />
                            </div>
                            <div className="p-3 rounded-full w-fit cursor-pointer bg-gray-200 hover:bg-gray-300">
                                <FaTrash className='text-lg text-red-500' />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};

export default Tasks;